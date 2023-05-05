import { View, Text } from 'react-native';
import React from 'react';
import TitleText from '../TitleText';

type RecentItemProps = {
  location: string;
  date: string;
};

export default function RecentItem({ location, date }: RecentItemProps) {
  return (
    <View className='w-40 h-40 py-8 px-2 mx-2 mb-8 bg-custom-red rounded-xl flex flex-col items-center justify-between shadow shadow-gray-800'>
      <TitleText text={location} styles={'text-3xl text-center text-white '} />
      <TitleText text={date} styles={'text-xl text-white'} />
    </View>
  );
}
