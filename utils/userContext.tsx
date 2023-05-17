import React, { useState, createContext, useContext } from 'react';

export type currentUserType = {
  email: string;
  username: string;
  uuid: string;
  zip: string;
  url: string;
  recents: [];
};

type UserContextType = {
  isFound: boolean;
  setIsFound: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: currentUserType | undefined;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<currentUserType | undefined>
  >;
};

const UserContextProvider = createContext<UserContextType>({
  isFound: false,
  setIsFound: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
});

export const UserContext = ({ children }: any) => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<currentUserType | undefined>(
    undefined
  );

  return (
    <UserContextProvider.Provider
      value={{
        isFound: isFound,
        setIsFound: setIsFound,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export const getContext = () => {
  return useContext(UserContextProvider);
};
