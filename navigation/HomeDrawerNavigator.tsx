import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import CustomDrawer from '../components/HomeScreen/CustomDrawer';
import ProfileScreen from '../screens/Profile';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: 'white',
        drawerActiveTintColor: '#FB2E01',
        headerShown: false,
      }}
    >
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Profile' component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
