import React, { createContext, useEffect, useState } from 'react';
import { auth } from '@/libs/firebase';
import { IUser, convertAuthInfoToUser } from '@/libs/model/user';
import { create as createUser } from '@/libs/api/user';

interface IAuthContext {
  currentUser: IUser | null | undefined;
  isInitialized: boolean;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: undefined,
  isInitialized: false,
  signOut: () => null,
});

interface IProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null | undefined>(
    undefined,
  );
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const signOut = () => {
    setCurrentUser(null);
    setIsInitialized(false);
  };

  useEffect(() => {
    auth
      .getRedirectResult()
      .then(async (result) => {
        if (result.additionalUserInfo?.isNewUser && result.user) {
          const newUser = convertAuthInfoToUser(result.user);
          await createUser(newUser);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    auth.onAuthStateChanged((user) => {
      console.log(user);
      user && setCurrentUser(convertAuthInfoToUser(user));
      setIsInitialized(true);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        isInitialized: isInitialized,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
