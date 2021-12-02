import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {CareHomes} from './src/view/CareHomes';
import {Checkups} from './src/view/Checkups';
import {Patients} from './src/view/Patients';

export type RootStackParamList = {
  CareHomes: undefined;
  Patients: {id: number};
  Checkups: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CareHomes">
          <Stack.Screen name="CareHomes" component={CareHomes} />
          <Stack.Screen name="Patients" component={Patients} />
          <Stack.Screen name="Checkups" component={Checkups} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
