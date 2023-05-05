import React from 'react';
import { Text, View } from 'react-native';
export default function Loading() {
  return (
    //TODO: Make this prettier
    <View className='flex-1 bg-custom-dark items-center justify-center'>
      <Text className='text-white text-xl font-bold'>
        Getting things ready for you...
      </Text>
    </View>
  );
}
