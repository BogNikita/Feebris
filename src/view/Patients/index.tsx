import React, {useCallback, useEffect} from 'react';
import {FlatList, SafeAreaView, StatusBar} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  fetchPatients,
  setActivePatients,
} from '../../effects/patients/patient.slice';
import {
  selecPatientLoading,
  selectPatients,
  selectPatientError,
} from '../../effects/patients/patients.selector';
import {selectActiveCareHomes} from '../../effects/careHomes/careHome.selector';
import {Patient, Loader, ErrorComponent} from '../../components';

interface IPatients {
  route: RouteProp<RootStackParamList, 'Patients'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Patients'>;
}

export const Patients: React.FC<IPatients> = ({route, navigation}) => {
  const {id: careHomesId} = route.params;
  const dispatch = useAppDispatch();
  const patients = useAppSelector(selectPatients);
  const activeCareHomes = useAppSelector(selectActiveCareHomes);
  const error = useAppSelector(selectPatientError);
  const loading = useAppSelector(selecPatientLoading);

  useEffect(() => {
    navigation.setOptions({title: `${activeCareHomes} Patients`});
    dispatch(fetchPatients(careHomesId));
  }, [dispatch, careHomesId, navigation, activeCareHomes]);

  const navigateHandler = useCallback(
    id => {
      dispatch(setActivePatients(id));
      navigation.navigate('Checkups', {id});
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
        data={patients}
        keyExtractor={item => item.id + ''}
        renderItem={({item: {firstName, lastName, id, assignedPractices}}) => (
          <Patient
            firstName={firstName}
            lastName={lastName}
            id={id}
            assignedPractices={assignedPractices}
            navigate={navigateHandler}
          />
        )}
      />
    </SafeAreaView>
  );
};
