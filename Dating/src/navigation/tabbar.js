import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ServiceStack from './stack/ServiceStack';
import HomeTab from './stack/HomeTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text} from 'react-native';
const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const option = {
    headerShown: false,
    tabBarShowLabel: false,
  };
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: 'white',
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'HomeStack':
              iconName = focused ? 'home' : 'home';
              return (
                <View style={{alignItems: 'center'}}>
                  <Icon
                    name={iconName}
                    size={25}
                    color={focused ? 'red' : 'grey'}
                  />
                  <Text style={{color: 'black'}}>Home</Text>
                </View>
              );
            case 'ServiceStack':
              iconName = focused ? 'user' : 'user';
              return (
                <View style={{alignItems: 'center'}}>
                  <Icon
                    name={iconName}
                    size={28}
                    color={focused ? 'red' : 'grey'}
                  />
                  <Text style={{color: 'black'}}>Account</Text>
                </View>
              );
            default:
              return null;
          }
        },
      })}>
      <Tab.Screen name="HomeStack" component={HomeTab} options={{...option}} />
      <Tab.Screen
        name="ServiceStack"
        component={ServiceStack}
        options={{...option}}
      />
    </Tab.Navigator>
  );
}
