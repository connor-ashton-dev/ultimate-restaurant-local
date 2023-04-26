import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet } from 'react-native';
import {
  useFonts,
  Bangers_400Regular as Bangers,
} from '@expo-google-fonts/bangers';
import { Image } from 'expo-image';

export default function Splash() {
  const [fontsLoaded] = useFonts({
    Bangers,
  });

  if (!fontsLoaded) {
    return <Text>Loading ...</Text>;
  } else {
    return (
      <View className='flex-1 flex items-center bg-custom-dark'>
        {/* TITLE CONTAINER  */}
        <View className='mt-24 items-center'>
          <Text
            style={{ fontFamily: 'Bangers' }}
            className='text-6xl text-white'
          >
            Ultimate.
          </Text>
          <Text
            style={{ fontFamily: 'Bangers' }}
            className='text-6xl text-white'
          >
            Restaurant.
          </Text>
          <Text
            style={{ fontFamily: 'Bangers' }}
            className='text-6xl text-white'
          >
            Local.
          </Text>
        </View>

        <Image
          source={require('../assets/url-logo.png')}
          style={{ width: 200, height: 200 }}
          className='my-12'
        />
        <Text style={{ fontFamily: 'Bangers' }} className='text-3xl text-white'>
          "I'll have the usual"
        </Text>
      </View>
    );
  }
}
