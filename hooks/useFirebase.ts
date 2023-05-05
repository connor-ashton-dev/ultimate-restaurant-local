import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import uuid from 'react-native-uuid';
import { getContext, currentUserType } from '../utils/userContext';
import { useUser } from '@clerk/clerk-expo';

export const checkIfUserIsCreated = async (email: string): Promise<string> => {
  let myResult: string = 'not found';
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
