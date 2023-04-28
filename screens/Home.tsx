import { useAuth, useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import RecentItem from '../components/HomeScreen/RecentItem';
import TitleText from '../components/TitleText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type RecentItemType = {
  id: number;
  location: string;
  date: string;
};

const sampleData: RecentItemType[] = [
  { id: 1, location: 'Betos', date: 'Monday' },
  { id: 2, location: 'mcdonalds', date: 'Wednesday' },
  { id: 3, location: 'chic fil a', date: 'Tuesday' },
  { id: 4, location: 'Canes', date: 'Friday' },
  { id: 5, location: 'Betos', date: 'Saturday' },
  { id: 6, location: 'Betos', date: 'Monday' },
];

export default function HomeScreen({ navigation }: any) {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <View className='flex-1 flex flex-col bg-custom-dark items-start'>
      <TouchableOpacity
        className='mt-16 mx-4 flex'
        onPress={() => navigation.openDrawer()}
      >
        <MaterialCommunityIcons name='hamburger' size={36} color='white' />
      </TouchableOpacity>
      <ScrollView
        className='flex-1 flex flex-col bg-custom-dark'
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <TitleText
          text={`Welcome Back, ${user?.firstName}`}
          styles={'text-4xl pt-8'}
        />
        {/* RECENTS SECTION */}
        <TitleText text={'Recents'} styles={'text-3xl pt-24'} />

        <View className='flex flex-row justify-start px-2 mt-8 '>
          <ScrollView horizontal={true}>
            {/* funny silly commment */}
            {sampleData.map((item) => (
              <View key={item.id}>
                <RecentItem location={item.location} date={item.date} />
              </View>
            ))}
          </ScrollView>
        </View>
        <View className='h-0.5 bg-white w-[95%] my-8 ' />

        {/* LEADERBOARD SECTION */}
        <TitleText text={'My Leaderboard'} styles={'text-3xl '} />
      </ScrollView>
    </View>
  );
}
