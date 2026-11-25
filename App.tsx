import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InventoryProvider } from './src/context/InventoryContext';
import { Routes } from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <InventoryProvider>
        <StatusBar style="dark" />
        <Routes />
      </InventoryProvider>
    </SafeAreaProvider>
  );
}
