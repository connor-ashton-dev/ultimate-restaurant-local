import React from 'react';
import { Text } from 'react-native';
import {
  useFonts,
  Bangers_400Regular as Bangers,
} from '@expo-google-fonts/bangers';

type TitleTextProps = {
  text: string;
  styles: string;
};

export default function TitleText({ text, styles }: TitleTextProps) {
  const [fontsLoaded] = useFonts({
    Bangers,
  });
  if (!fontsLoaded) {
    return <Text>Loading ...</Text>;
  } else {
    return (
      <Text
        style={{ fontFamily: 'Bangers' }}
        className={`${styles} uppercase tracking-widest`}
      >
        {text}
      </Text>
    );
  }
}
