import { User } from 'firebase';

export interface IUser {
  email: string;
  name: string;
  avatarUrl: string;
}

// export type IUserBody = Omit<IUser, 'id'>;
export type IUserBody = IUser;

export const convertAuthInfoToUser = (authInfo: User): IUser => {
  return {
    email: authInfo.email ? authInfo.email : '',
    name: authInfo.displayName ? authInfo.displayName : '',
    avatarUrl: authInfo.photoURL ? authInfo.photoURL : '',
  };
};
