import 'react-native-gesture-handler';
import React from 'react';
import { ClerkProvider } from '@clerk/clerk-expo';
import Nav from './navigation/Nav';
import { tokenCache } from './components/TokenCache';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-hooks';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from './utils/userContext';

const publishableKey =
  'pk_test_YWRlcXVhdGUtbGlvbmVzcy01NC5jbGVyay5hY2NvdW50cy5kZXYk';

const searchClient = algoliasearch(
  '2B37R4NTUU',
  '89b3282df7d9f610bf441f84e905d3cf'
);

export default function App() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <InstantSearch
        searchClient={searchClient}
        indexName='firebase-restaurant-search'
      >
        <UserContext>
          <Nav />
          <StatusBar />
        </UserContext>
      </InstantSearch>
    </ClerkProvider>
  );
}
