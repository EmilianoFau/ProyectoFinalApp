import { Stack } from "expo-router";
import React from "react";
import TopNav from './components/topNav';  
import BottomNav from './components/bottomNav';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => null }} />
      <Stack.Screen 
        name="feed" 
        options={{ 
          header: () => null, 
        }} 
      />
      <Stack.Screen name="profile" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="upload" />
      <Stack.Screen name="register" options={{ header: () => null }} />
    </Stack>
  );
}
