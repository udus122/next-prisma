import { User } from 'firebase';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../libs/firebase';

// Contextの型を用意
interface IAuthContext {
  currentUser: User | null | undefined;
  isInitialized: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: undefined,
  isInitialized: false,
});

interface IProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined,
  );
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsInitialized(true);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        isInitialized: isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
