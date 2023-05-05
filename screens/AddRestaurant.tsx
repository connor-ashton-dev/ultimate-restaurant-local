import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddRestaurant() {
  const handleClick = async () => {};
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>Add a restaurant</Text>
      <TextInput
        placeholder='Restaurant here...'
        placeholderTextColor='lightgray'
        className='border border-black py-2 px-1 w-48 rounded-xl '
      />
      <TouchableOpacity onPress={handleClick}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
