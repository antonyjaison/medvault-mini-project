import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack initialRouteName="details">
      <Stack.Screen name="details" options={{
        headerShown: false
      }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{
        headerShown:false
      }} />
    </Stack>
  );
};

export default AuthLayout;
