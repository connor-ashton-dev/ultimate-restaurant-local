import { Text, View } from 'react-native';
import React from 'react';
import { OAuthButtons } from '../components/SignInWithOAuth';
import {
  useFonts,
  Bangers_400Regular as Bangers,
} from '@expo-google-fonts/bangers';

export default function Login() {
  const [fontsLoaded] = useFonts({
    Bangers,
  });
  if (!fontsLoaded) {
    return <Text>Loading ...</Text>;
  } else {
    return (
      <View className='flex-1 flex items-center bg-custom-dark'>
        {/* TITLE TEXT */}
        <View className='mt-24'>
          <Text
            style={{ fontFamily: 'Bangers' }}
            className='text-5xl text-white uppercase'
          >
            What's up.
          </Text>
          <Text
            style={{ fontFamily: 'Bangers' }}
            className='text-5xl text-white uppercase'
          >
            Glad ur back.
          </Text>
          <Text
            style={{ fontFamily: 'Bangers' }}
            className='text-5xl text-white uppercase'
          >
            Login Here.
          </Text>
          <OAuthButtons />
        </View>
      </View>
    );
  }
}
