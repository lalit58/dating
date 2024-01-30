import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './tabbar';
import SignUpStack from './stack/signUpStack';

const Navigation = () => {
  const [sign, setSign] = useState(true);
  return (
    <NavigationContainer>
      {sign ? <SignUpStack /> : <TabNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
