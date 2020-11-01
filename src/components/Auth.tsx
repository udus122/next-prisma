import { User } from 'firebase';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../libs/firebase';

// Contextの型を用意
interface IAuthContext {
  currentUser: User | null | undefined;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: undefined,
});

interface IProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined,
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
