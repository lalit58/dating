import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Service from "../../Screen/Service";

const Stack = createNativeStackNavigator();

const ServiceStack = () => {
  const option = {
    headerShown: false,
    gestureEnabled: false,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="serviceStack" component={Service} options={option} />
    </Stack.Navigator>
  );
};

export default ServiceStack;
