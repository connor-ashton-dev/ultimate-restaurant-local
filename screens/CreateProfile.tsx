import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import TitleText from '../components/TitleText';
import { createUser } from '../hooks/useFirebase';
import { currentUserType, getContext } from '../utils/userContext';

export default function CreateProfile() {
  const { setIsFound, setCurrentUser } = getContext();
  const [username, setUsername] = useState('');
  //TODO: ZIP CODE VALIDATION
  const [zip, setZip] = useState('');
  const { user } = useUser();

  const handleSubmit = async () => {
    if (user) {
      const email = user.emailAddresses[0].emailAddress;
      const id = user.id;
      const url = user.profileImageUrl;
      if (email) {
        try {
          const myUser: currentUserType = {
            username: username,
            email: email,
            zip: zip,
            uuid: id,
            url: url,
            recents: [],
          };
          await createUser(myUser, setCurrentUser);
          setIsFound(true);
        } catch (e) {
          console.log('error in createUserScreen', e);
        }
      } else {
        //TODO: error message
      }
    }
  };
  return (
    <View className='flex-1 bg-custom-dark items-center'>
      <View className='mt-24 items-center'>
        <TitleText
          text="Looks like you're new"
          styles={'text-white text-4xl shadow shadow-gray-800'}
        />
        <TitleText
          text="Let's change that"
          styles={'text-white text-3xl shadow shadow-gray-800'}
        />
      </View>

      <View className='my-16'>
        {/* TODO: Probably need to do some keyboard avoiding views here, also maybe take off autocorrect and stuff */}
        <TextInput
          placeholder='Username'
          placeholderTextColor='lightgray'
          className='bg-white w-80 text-xl px-4 rounded-xl h-11 mb-12 shadow shadow-gray-800'
          onChangeText={(value) => setUsername(value)}
        />
        <TextInput
          placeholder='Zip Code'
          placeholderTextColor='lightgray'
          className='bg-white w-80 text-xl px-4 rounded-xl h-11 mb-4 shadow shadow-gray-800'
          onChangeText={(value) => setZip(value)}
        />
      </View>

      <TouchableOpacity
        className='bg-custom-red px-8 py-4 rounded-xl mt-24'
        onPress={handleSubmit}
      >
        <TitleText text='Create my account' styles={'text-white text-2xl'} />
      </TouchableOpacity>
    </View>
  );
}
