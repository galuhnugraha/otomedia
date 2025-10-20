import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListPageScreen from '../pages/ListPage';
import FormPageScreen from '../pages/FormPage';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListPage" component={ListPageScreen} />
      <Stack.Screen name="FormPage" component={FormPageScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;