import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../global/types';
import { Login } from '../pages/Login';
import { BottomRoutes } from './bottom.routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTabs" component={BottomRoutes} />
    </Stack.Navigator>
  );
};
