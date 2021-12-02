import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectActivePatient} from '../../effects/patients/patients.selector';
import {
  selectCheckups,
  selectCheckupsLoading,
  selectCheckupsError,
} from '../../effects/checkups/checkups.selector';
import {fetchCheckups} from '../../effects/checkups/checkup.slice';
import {Checkup, Loader, ErrorComponent} from '../../components';

interface ICheckups {
  route: RouteProp<RootStackParamList, 'Checkups'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Checkups'>;
}

export const Checkups: React.FC<ICheckups> = ({route, navigation}) => {
  const {id: patientId} = route.params;
  const dispatch = useAppDispatch();
  const activePatient = useAppSelector(selectActivePatient);
  const loading = useAppSelector(selectCheckupsLoading);
  const error = useAppSelector(selectCheckupsError);
  const checkups = useAppSelector(selectCheckups);

  useEffect(() => {
    navigation.setOptions({title: activePatient});
    dispatch(fetchCheckups(patientId));
  }, [dispatch, navigation, activePatient, patientId]);

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
        data={checkups}
        keyExtractor={item => item.id + ''}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.text}>The patient was not examined.</Text>
          </View>
        }
        renderItem={({item: {createdAt, averageSPO2}}) => (
          <Checkup createdAt={createdAt} averageSPO2={averageSPO2} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  empty: {
    display: 'flex',
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    transform: [{translateY: -Dimensions.get('window').height / 8}],
  },
});
