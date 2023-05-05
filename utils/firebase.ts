// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyADV52ARVyhx844kAGq2NQDDgMxfo3r1LE',
  authDomain: 'ultimate-restaurant-local.firebaseapp.com',
  projectId: 'ultimate-restaurant-local',
  storageBucket: 'ultimate-restaurant-local.appspot.com',
  messagingSenderId: '748676054058',
  appId: '1:748676054058:web:0837e028795b3eac205753',
  measurementId: 'G-HNFCCRV6QE',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
