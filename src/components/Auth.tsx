import React, { createContext, useEffect, useState } from 'react';
import { auth } from '@/libs/firebase';
import { IUser, buildUserBodyFromAuthInfo } from '@/libs/model/user';
import { create as createUser, get as getUser } from '@/libs/api/user';

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
        if (result.user && result.additionalUserInfo?.isNewUser) {
          const newUser = await createUser(
            buildUserBodyFromAuthInfo(result.user),
          );
          if (newUser === undefined) {
            throw new Error();
          }
          setCurrentUser(newUser);
          setIsInitialized(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (!isInitialized) {
      auth.onAuthStateChanged(async (user) => {
        if (user && user.email) {
          const authUser = await getUser({ email: user.email });
          setCurrentUser(authUser);
        }
        setIsInitialized(true);
      });
    }
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
