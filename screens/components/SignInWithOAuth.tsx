import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Text, TouchableOpacity, View } from 'react-native';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
WebBrowser.maybeCompleteAuthSession();

export function OAuthButtons() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View className='flex flex-col gap-8 my-16'>
      <TouchableOpacity
        onPress={onPress}
        className='px-6 py-4 rounded-lg bg-white'
      >
        <View className='flex-row items-center gap-4'>
          <Image
            source={require('../assets/google.png')}
            style={{ width: 20, height: 20 }}
            className=''
          />
          <Text className='text-black text-lg'>Continue with Google 🍕</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        className='px-6 py-4 rounded-lg bg-white'
      >
        <View className='flex-row items-center gap-4'>
          <Image
            source={require('../assets/facebook.png')}
            style={{ width: 20, height: 20 }}
            className=''
          />
          <Text className='text-black text-lg'>Continue with Facebook 🥤</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
