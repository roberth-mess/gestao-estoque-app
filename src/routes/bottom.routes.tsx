import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabParamList } from '../global/types';
import { theme } from '../global/theme';
import { RegisterProduct } from '../pages/RegisterProduct';
import { InventoryList } from '../pages/InventoryList';
import { StockOut } from '../pages/StockOut';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="InventoryList"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'cube-outline';

          if (route.name === 'RegisterProduct') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'InventoryList') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'StockOut') {
            iconName = focused ? 'arrow-down-circle' : 'arrow-down-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="RegisterProduct"
        component={RegisterProduct}
        options={{ tabBarLabel: 'Cadastro' }}
      />
      <Tab.Screen
        name="InventoryList"
        component={InventoryList}
        options={{ tabBarLabel: 'Estoque' }}
      />
      <Tab.Screen
        name="StockOut"
        component={StockOut}
        options={{ tabBarLabel: 'Saída / Baixa' }}
      />
    </Tab.Navigator>
  );
};
