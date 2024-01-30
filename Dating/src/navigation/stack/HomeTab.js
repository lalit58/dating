import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Screen/Home";
import Social from "../../Screen/Home/social";
import DetailsScreen from "../../Screen/Home/detailsScreen";
import WebviewContent from "../../components/webview";

const Stack = createNativeStackNavigator();
const HomeTab = () => {
  const option = {
    headerShown: false,
    gestureEnabled: false,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={option} />
      <Stack.Screen name="social" component={Social} options={option} />
      <Stack.Screen name="details" component={DetailsScreen} options={option} />
      <Stack.Screen
        name="webview"
        component={WebviewContent}
        options={option}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
