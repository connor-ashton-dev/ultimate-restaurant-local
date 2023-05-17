import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { useInfiniteHits } from 'react-instantsearch-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addRestaurantToRecents, addToLeaderBoard } from '../hooks/useFirebase';

//FIXME: Prolly wanna change these elint ignores some day

//eslint-disable-next-line
export default function InfiniteHits({
  //eslint-disable-next-line
  hitComponent: Hit,
  //eslint-disable-next-line
  currentUser,
  //eslint-disable-next-line
  setRecentData,
  //eslint-disable-next-line
  setModal,
  populateRecentData,
  ...props
}) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);

  return (
    <FlatList
      data={hits}
      keyExtractor={(item) => item.objectID}
      className='w-full px-16'
      ItemSeparatorComponent={() => <View />}
      onEndReached={() => {
        if (!isLastPage) {
          showMore();
        }
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          className='my-4 w-full bg-white py-4 px-2 rounded-lg shadow'
          onPress={async () => {
            // const date = new Date().toLocaleString().split(',')[0];
            // const data = {
            //   date: date,
            //   uuid: item.name,
            // };
            await addRestaurantToRecents(item.uuid, currentUser);
            //update leaderboard
            await addToLeaderBoard(currentUser, item.uuid);
            populateRecentData();
            // setRecentData((oldData) => [data, ...oldData]);
            setModal(false);
          }}
        >
          <Hit hit={item} />
        </TouchableOpacity>
      )}
    />
  );
}

//eslint-disable-next-line
export function Hit({ hit }) {
  //eslint-disable-next-line
  return <Text className='font-bold text-lg'>{hit.name}</Text>;
}
