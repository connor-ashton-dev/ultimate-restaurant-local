import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InfiniteHits, { Hit } from '../components/InfiniteHits';
import SearchBox from '../components/SearchBox';
import TitleText from '../components/TitleText';
import {
  addRestaurantToRecents,
  getUUIDfromRestaurantName,
  createNewRestaurant,
  addToLeaderBoard,
  checkIfDuplicateRequest,
} from '../hooks/useFirebase';
import { RecentItemType } from '../types';
import { currentUserType } from '../utils/userContext';

type AddRestaurantPropTypes = {
  setRecentData: React.Dispatch<React.SetStateAction<RecentItemType[]>>;
  setShowAddRestaurantModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: currentUserType | undefined;
};

export default function AddRestaurant({
  setRecentData,
  setShowAddRestaurantModal,
  currentUser,
}: AddRestaurantPropTypes) {
  const [myRestaurant, setMyRestaurant] = useState<string>('');

  // useEffect(() => {
  //   if (myRestaurant.length > 0) {
  //     getRestaurantsThatMatch(myRestaurant);
  //   }
  // }, [myRestaurant]);

  const handleClick = async () => {
    if (currentUser) {
      const date = new Date().toLocaleString().split(',')[0];
      const dataToSend: RecentItemType = {
        date: date,
        uuid: myRestaurant,
      };
      const restaurantUUID = await getUUIDfromRestaurantName(myRestaurant);
      //check if the user has eaten at the restuarant today
      //TODO: Maybe use time in case the user has eaten earlier that day at the restaurant (3 hrs later or something)

      //FIXME:  I AM HERE. I NEED TO MAKE SURE SOMEONE CAN'T SEND MULTIPLE REQUESTS TO THE SAME LEADERBOARD
      const hasEaten = await checkIfDuplicateRequest(
        currentUser,
        restaurantUUID
      );
      console.log(hasEaten);
      setShowAddRestaurantModal(false);
      if (restaurantUUID !== 'not found') {
        //Add restaurant to list
        await addRestaurantToRecents(restaurantUUID, currentUser);
        //update leaderboard
        await addToLeaderBoard(currentUser, restaurantUUID);
        setRecentData((oldData) => [dataToSend, ...oldData]);
      } else {
        // create a new restaurant
        const uuid = await createNewRestaurant(myRestaurant, currentUser);
        // update leaderboard
        if (uuid !== 'ERROR') {
          await addToLeaderBoard(currentUser, uuid);
          setRecentData((oldData) => [dataToSend, ...oldData]);
        }
      }
    }
  };
  return (
    <View className='flex-1 items-center justify-center w-screen bg-custom-red'>
      <TitleText
        text='Add a restaurant'
        styles={'text-white text-4xl mt-24 px-2'}
      />
      <SearchBox />
      <InfiniteHits
        hitComponent={Hit}
        currentUser={currentUser}
        setRecentData={setRecentData}
        setModal={setShowAddRestaurantModal}
      />
      <TouchableOpacity onPress={handleClick} className='mb-12'>
        <Text className='text-white'>Not there? Create</Text>
      </TouchableOpacity>
    </View>
  );
}
