import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { getContext } from '../utils/userContext';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const { setCurrentUser } = getContext();
  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(undefined);
    } catch (err: any) {
      console.log('Error:> ' + err?.status || '');
      console.log('Error:> ' + err?.errors ? JSON.stringify(err.errors) : err);
    }
  };
  const changeName = async () => {
    if (user) {
      try {
        // await user.update({ firstName: name });
      } catch (err: any) {
        console.log(
          'Error:> ' + err?.errors ? JSON.stringify(err.errors) : err
        );
      }
    }
  };
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-black'>ProfileScreen</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
