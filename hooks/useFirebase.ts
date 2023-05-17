import {
  collection,
  doc,
  setDoc,
  // addDoc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import uuid from 'react-native-uuid';
import { currentUserType } from '../utils/userContext';
// import { useUser } from '@clerk/clerk-expo';
import { RecentItemType, RestaurantType } from '../types';
// import { clockRunning } from 'react-native-reanimated';

export const checkIfUserIsCreated = async (email: string): Promise<string> => {
  let myResult = 'not found';
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    const foundEmail = doc.data().email;
    if (foundEmail === email) {
      myResult = 'found';
    }
  });
  return Promise.resolve(myResult);
};

export const createUser = async (
  username: string,
  email: string,
  zipcode: string,
  id: string
) => {
  try {
    //TODO: MAKE SURE YOU CAN'T DUPLICATE USERNAMES

    await setDoc(doc(db, 'users', id), {
      uuid: id,
      email: email,
      username: username,
      zip: zipcode,
      recents: {},
    });
  } catch (e) {
    console.error('error creating user', e);
  }
};

// export const getRecentRestaurants = async () => {};

export const setUserContextData = async (
  userId: string,
  setCurrentUser: React.Dispatch<
    React.SetStateAction<currentUserType | undefined>
  >
) => {
  //look in firebase
  try {
    const ref = doc(db, 'users', userId);
    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    const firebaseUserData: currentUserType = {
      zip: data?.zip,
      uuid: data?.uuid,
      email: data?.email,
      username: data?.username,
      recents: data?.recents,
    };
    setCurrentUser(firebaseUserData);
  } catch (e) {
    console.log('ERROR:', e);
  }
};

export const getLocationFromUUID = async (uuid: string): Promise<string> => {
  try {
    const ref = doc(db, 'restaurants', uuid);
    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    if (data) {
      return data.name;
    } else {
      return 'ERROR';
    }
  } catch (e) {
    console.log('ERROR:', e);
    return 'ERROR';
  }
};

export const getUUIDfromRestaurantName = async (
  name: string
): Promise<string> => {
  let myResult = 'not found';
  try {
    const snapshot = await getDocs(collection(db, 'restaurants'));
    snapshot.forEach((doc) => {
      const foundName = doc.data().name;
      if (foundName === name) {
        myResult = doc.data().uuid;
      }
    });
  } catch (e) {
    console.log('ERROR:', e);
    return 'ERROR';
  }

  return Promise.resolve(myResult);
};

export const addRestaurantToRecents = async (
  response: string,
  currentUser: currentUserType
) => {
  const { uuid } = currentUser;
  const date = new Date().toLocaleString().split(',')[0];
  const recentRestaurant: RecentItemType = {
    date: date,
    uuid: response,
  };
  //get recents from firebase
  try {
    const ref = doc(db, 'users', uuid);
    await updateDoc(ref, {
      recents: arrayUnion(recentRestaurant),
    });
  } catch (error) {
    console.log(error);
  }
};

export const addRestaurantToLeaderBoard = async (uuid: string) => {
  await setDoc(doc(db, 'leaderboard', uuid), {});
};

export const createNewRestaurant = async (
  name: string,
  currentUser: currentUserType
): Promise<string> => {
  const myUUID = uuid.v4().toString();
  const myRestaurant: RestaurantType = {
    name: name,
    uuid: myUUID,
  };
  try {
    await setDoc(doc(db, 'restaurants', myUUID), myRestaurant);
    await addRestaurantToRecents(myUUID, currentUser);
    await addRestaurantToLeaderBoard(myUUID);
    return myUUID;
  } catch (e) {
    console.error('error creating restaurant', e);
    return 'ERROR';
  }
};

export const addToLeaderBoard = async (
  currentUser: currentUserType,
  restaurantUUID: string
) => {
  const ref = doc(db, 'leaderboard', restaurantUUID);
  const snapshot = await getDoc(ref);
  const data = snapshot.data();
  if (data) {
    const user = data[currentUser.uuid];
    if (user) {
      //user exists
      await updateDoc(ref, {
        [currentUser.uuid]: increment(1),
      });
    } else {
      //user does not exist
      await setDoc(ref, {
        [currentUser.uuid]: 1,
      });
    }
  }
};

//TODO: THIS IS IMPORTANT
// export const checkIfDuplicateRequest = async (
//   currentUser: currentUserType,
//   uuid: string
// ): Promise<boolean> => {
//   const eaten = false;
//
//   return eaten;
// };

// export const getRestaurantsThatMatch = (restaurant: string) => {
//
// };

export const getUserUUIDFromName = async (name: string): Promise<string> => {
  let myResult = 'not found';
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      const foundName = doc.data().username;
      if (foundName === name) {
        myResult = doc.data().uuid;
      }
    });
  } catch (e) {
    console.log('ERROR:', e);
    return 'ERROR';
  }

  return Promise.resolve(myResult);
};

export const getFriendFromDB = async (
  name: string
): Promise<string | currentUserType> => {
  let myResult: currentUserType | string = 'not found';
  const UUID = await getUserUUIDFromName(name);
  if (UUID !== 'not found') {
    const ref = doc(db, 'users', UUID);
    const snapshot = await getDoc(ref);
    myResult = snapshot.data() as currentUserType;
  }
  return Promise.resolve(myResult);
};
