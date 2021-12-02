import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, StatusBar, FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  selectCareHomes,
  selectCareHomesLoading,
  selectCareHomesError,
} from '../../effects/careHomes/careHome.selector';
import {
  fetchCareHomes,
  setActiveCareHomes,
} from '../../effects/careHomes/careHome.slice';
import {ListItem, Loader, ErrorComponent} from '../../components';

interface ICareHomes {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CareHomes'>;
}

export const CareHomes: React.FC<ICareHomes> = ({navigation}) => {
  const careHomes = useAppSelector(selectCareHomes);
  const loading = useAppSelector(selectCareHomesLoading);
  const error = useAppSelector(selectCareHomesError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCareHomes());
  }, [dispatch]);

  const navigationHandler = useCallback(
    id => {
      dispatch(setActiveCareHomes(id));
      navigation.navigate('Patients', {id});
    },
    [navigation, dispatch],
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={careHomes}
        keyExtractor={item => item.id + ''}
        renderItem={({item: {name, id}}) => (
          <ListItem name={name} id={id} navigate={navigationHandler} />
        )}
      />
    </SafeAreaView>
  );
};
