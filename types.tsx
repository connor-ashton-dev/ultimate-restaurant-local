import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  //eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    //eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  Social: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RecentItemType = {
  // id: number;
  uuid: string;
  date: string;
};

export type RestaurantType = {
  name: string;
  uuid: string;
};
