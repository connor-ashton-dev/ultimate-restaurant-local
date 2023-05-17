import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TitleText from '../components/TitleText';
import { getFriendFromDB } from '../hooks/useFirebase';
import { currentUserType } from '../utils/userContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Social({ navigation }: any) {
  const search = async () => {
    setError('');
    setResult(undefined);
    const friend: currentUserType | string = await getFriendFromDB(
      searchFriend
    );
    if (friend == 'not found') {
      setError('User not found');
    } else {
      if (friend) {
        setResult(friend as currentUserType);
      }
    }
  };

  const [searchFriend, setSearchFriend] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<currentUserType>();
  return (
    <View className='flex flex-1 flex-col items-center bg-custom-dark pt-12'>
      <View className='flex-row mt-12 items-center mx-4'>
        <TouchableOpacity
          className='flex-1'
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <AntDesign name='leftcircle' size={30} color='white' />
        </TouchableOpacity>
        <TitleText text='Social' styles={' text-5xl text-white'} />
        <View className='flex flex-1' />
      </View>
      <View className='flex flex-row items-center mt-12'>
        <TextInput
          className='w-64 border-2 my-4 border-white py-2 px-1 text-white'
          style={{ fontSize: 20 }}
          placeholder='Search for a new friend'
          placeholderTextColor='white'
          onChangeText={(text) => setSearchFriend(text)}
        />
        <TouchableOpacity
          onPress={search}
          className='border-2 border-white py-2 px-3 bg-custom-red'
        >
          <FontAwesome5 name='search' size={24} color='white' />
        </TouchableOpacity>
      </View>
      {result && (
        <>
          <View className='bg-white p-3 rounded-lg'>
            <View className='flex flex-row gap-4'>
              <Image
                source={result.url}
                style={{ width: 60, height: 60, borderRadius: 50 }}
              />
              <View className='flex flex-col'>
                <Text className='text-lg'>{result.username}</Text>
                <Text>{result.email}</Text>
              </View>
            </View>
            <TouchableOpacity className='flex flex-row justify-center bg-blue-500 mx-8 py-2 mt-3 rounded'>
              <Text className='text-white font-bold'>Add</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {error && <Text>{error}</Text>}

      <View>
        <TitleText text='My Friends' styles={'text-3xl text-white mt-8'} />
      </View>
    </View>
  );
}
