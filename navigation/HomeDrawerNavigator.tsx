import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/Home';
import CustomDrawer from '../components/HomeScreen/CustomDrawer';
import ProfileScreen from '../screens/Profile';
import CreateProfile from '../screens/CreateProfile';
import Loading from '../screens/Loading';

import { checkIfUserIsCreated, setUserContextData } from '../hooks/useFirebase';
import { useUser } from '@clerk/clerk-expo';
import { getContext } from '../utils/userContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { setIsFound, isFound, currentUser, setCurrentUser } = getContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const setUp = async () => {
    setLoading(true);
    if (user) {
      const email = user?.emailAddresses[0].emailAddress;
      if (email) {
        const result = await checkIfUserIsCreated(email);
        if (result === 'found') {
          setUserContextData(user.id, setCurrentUser, setLoading);
          // setIsFound(true);
        } else {
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const setEverythingUp = async () => {
      await setUp();
    };

    setEverythingUp();
  }, []);

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            drawerActiveBackgroundColor: 'white',
            drawerActiveTintColor: '#FB2E01',
            headerShown: false,
          }}
        >
          {currentUser?.username !== undefined ? (
            <>
              <Drawer.Screen name='Home' component={HomeScreen} />
              <Drawer.Screen name='Profile' component={ProfileScreen} />
            </>
          ) : (
            <Drawer.Screen name='Sign Up' component={CreateProfile} />
          )}
        </Drawer.Navigator>
      )}
    </>
  );
}
