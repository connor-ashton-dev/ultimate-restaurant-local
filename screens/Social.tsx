import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getFriendFromDB } from '../hooks/useFirebase';
import { currentUserType } from '../utils/userContext';

export default function Social() {
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
    <View className='flex flex-1 flex-col items-center'>
      <TextInput
        placeholder='Search for a friend'
        placeholderTextColor='gray'
        onChangeText={(text) => setSearchFriend(text)}
      />
      <Button title='Search' onPress={search} />
      {result && (
        <>
          <Text>User Found:</Text>
          <Text>{result.username}</Text>
          <Text>{result.email}</Text>
          <Text>{result.uuid}</Text>
        </>
      )}
      {error && <Text>{error}</Text>}
    </View>
  );
}
