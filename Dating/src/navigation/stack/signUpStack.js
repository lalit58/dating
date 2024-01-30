import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Flash from '../../Screen/SignUp';
import SignIn from '../../Screen/SignUp/signIn';
import Register from '../../Screen/SignUp/register';
import {TabNavigator} from '../tabbar';
// import { TabNavigator } from "../tabbar";

const Stack = createNativeStackNavigator();

const SignUpStack = () => {
  const option = {
    headerShown: false,
    gestureEnabled: false,
    scrollEnabled: false,
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="flash" component={Flash} options={option} />
      <Stack.Screen name="signin" component={SignIn} options={option} />
      <Stack.Screen name="register" component={Register} options={option} />
      <Stack.Screen
        name="tabNavigator"
        component={TabNavigator}
        options={{...option}}
      />
    </Stack.Navigator>
  );
};

export default SignUpStack;
