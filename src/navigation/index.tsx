import React,{useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListPageScreen from '../pages/ListPage';
import FormPageScreen from '../pages/FormPage';
import { getDBConnection,createTable } from '../db/database';
import SplashscreenPage from '../pages/Splashscreen';

const Stack = createNativeStackNavigator();

function RootStack() {
    useEffect(() => {
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        await createTable(db);       
        console.log('Database & table ready!');
      } catch (error) {
        console.error('Failed to initialize database', error);
      }
    };

    initDB();
  }, []);

  return (
    <Stack.Navigator screenOptions={{
      animation: "slide_from_right",
      gestureEnabled: true,
      headerShown: false,
    }}>
      <Stack.Screen name="Splashscreen" component={SplashscreenPage} options={{ headerShown: false }} />
      <Stack.Screen name="ListPage" component={ListPageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FormPage" component={FormPageScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default RootStack;