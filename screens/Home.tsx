// import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import {
  View,
  // Text,
  TouchableOpacity,
  // TextInput,
  ScrollView,
  Text,
  ActivityIndicator,
  Modal,
} from 'react-native';
import RecentItem from '../components/HomeScreen/RecentItem';
import TitleText from '../components/TitleText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  // checkIfUserIsCreated,
  getAllRestuarants,
} from '../hooks/useFirebase';
import { getContext } from '../utils/userContext';
import AddRestaurant from './AddRestaurant';
import { RecentItemType } from '../types';

type LeaderboardItemType = {
  id: number;
  restaurant: string;
  ranking: number;
};

// const recentData: RecentItemType[] = [
// { id: 1, location: 'Betos', date: 'Monday' },
// ];

const leaderboardData: LeaderboardItemType[] = [
  { id: 1, restaurant: 'Betos', ranking: 2 },
  { id: 2, restaurant: 'McDonalds', ranking: 55 },
  { id: 3, restaurant: 'Canes', ranking: 102 },
  { id: 4, restaurant: 'Chic Fil A', ranking: 8 },
  { id: 5, restaurant: 'Casa Victoria', ranking: 1 },
];

export default function HomeScreen({ navigation }: any) {
  // const { signOut } = useAuth();
  // const { user } = useUser();
  const { currentUser } = getContext();
  const [recentData, setRecentData] = useState<RecentItemType[]>([]);
  const [recentsLoading, setRecentsLoading] = useState<boolean>(false);
  const [showAddRestaurantModal, setShowAddRestaurantModal] =
    useState<boolean>(false);

  const populateRecentData = async () => {
    setRecentData([]);
    setRecentsLoading(true);
    if (currentUser) {
      const recentRestaurants: RecentItemType[] | [] = await getAllRestuarants(
        currentUser
      );
      setRecentData(recentRestaurants);
      setRecentsLoading(false);
    }
  };

  useEffect(() => {
    populateRecentData();
  }, [currentUser?.recents]);

  return (
    <View className='flex-1 flexflex-col bg-custom-dark items-center justify-between'>
      <TouchableOpacity
        className='mt-16 px-4 flex pb-4 w-screen items-start'
        onPress={() => navigation.openDrawer()}
      >
        <MaterialCommunityIcons name='hamburger' size={36} color='white' />
      </TouchableOpacity>
      <ScrollView
        className=' flex flex-col bg-custom-dark w-screen'
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <TitleText
          text={`Welcome Back, ${currentUser?.username}`}
          styles={'text-4xl pt-8 shadow shadow-gray-800 text-white'}
        />
        {/* RECENTS SECTION */}
        <TitleText
          text={'Recents'}
          styles={'text-3xl pt-12 underline shadow shadow-gray-800 text-white'}
        />

        <View className='flex flex-row justify-start px-2 mt-8 bg-custom-dark'>
          {!recentsLoading ? (
            <ScrollView horizontal={true}>
              {recentData.map((item: RecentItemType, idx) => (
                <View key={idx}>
                  <RecentItem location={item.uuid} date={item.date} />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View className='flex-1 items-center justify-center py-5'>
              <ActivityIndicator />
            </View>
          )}
        </View>
        <View className='h-0.5 bg-white w-[95%] mb-8 ' />

        {/* LEADERBOARD SECTION */}
        <TitleText
          text={'My Leaderboard'}
          styles={'text-3xl underline shadow shadow-gray-900 text-white mb-8'}
        />

        <View className='bg-white py-5 mb-4 w-[90%] rounded-xl shadow shadow-gray-800'>
          {leaderboardData.map((item: LeaderboardItemType) => (
            <View
              key={item.id}
              className='bg-gray-300 my-2 py-2 mx-4 rounded-lg'
            >
              <TitleText
                text={`${item.restaurant}: #${item.ranking}`}
                styles={'text-xl text-black pl-2'}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {/* NAV BAR */}
      <View className='h-24 w-full bg-custom-dark flex flex-row items-center justify-between px-8 mb-4 '>
        <TouchableOpacity
          className=' flex items-center justify-center bg-white p-4 rounded-full shadow shadow-gray-800'
          onPress={() => {
            navigation.navigate('Social');
          }}
        >
          <Text className='text-xl p-0 m-0'>👥</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=' flex items-center justify-center bg-white p-4 rounded-full shadow shadow-gray-800'
          onPress={() => setShowAddRestaurantModal(true)}
        >
          <Text className='text-xl p-0 m-0'>🍕</Text>
        </TouchableOpacity>
        <TouchableOpacity className=' flex items-center justify-center bg-white p-4 rounded-full shadow shadow-gray-800'>
          <Text className='text-xl p-0 m-0'>🔎</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAddRestaurantModal}
        animationType={'slide'}
        transparent={false}
        presentationStyle={'formSheet'}
        onRequestClose={() => {
          // populateRecentData();
          setShowAddRestaurantModal(false);
        }}
      >
        <AddRestaurant
          setRecentData={setRecentData}
          setShowAddRestaurantModal={setShowAddRestaurantModal}
          currentUser={currentUser}
          populateRecentData={populateRecentData}
        />
      </Modal>
    </View>
  );
}
