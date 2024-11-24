import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="feed" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
