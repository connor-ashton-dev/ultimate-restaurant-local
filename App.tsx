import 'react-native-gesture-handler';
import React from 'react';
import { ClerkProvider } from '@clerk/clerk-expo';
import Nav from './navigation/Nav';
import { tokenCache } from './components/TokenCache';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from './utils/userContext';

const publishableKey =
  'pk_test_YWRlcXVhdGUtbGlvbmVzcy01NC5jbGVyay5hY2NvdW50cy5kZXYk';

export default function App() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <UserContext>
        <Nav />
        <StatusBar />
      </UserContext>
    </ClerkProvider>
  );
}
