import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { ClerkLoaded, useUser } from '@clerk/clerk-expo';
import DrawerNavigator from './HomeDrawerNavigator';

export default function Navigation() {
  {
    /* <NavigationContainer linking={LinkingConfiguration}> */
  }
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  const { isSignedIn } = useUser();

  return (
    <ClerkLoaded>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen
            name='HomeScreen'
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name='LoginScreen'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </ClerkLoaded>
  );
};
