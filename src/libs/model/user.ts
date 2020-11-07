import { User } from 'firebase';

export interface IUser {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
}

export type IGetParams = Pick<IUser, 'email'>;

export type IUserBody = Omit<IUser, 'id'>;

export const buildUserBodyFromAuthInfo = (authInfo: User): IUserBody => {
  return {
    email: authInfo.email || '',
    name: authInfo.displayName || '',
    avatarUrl: authInfo.photoURL || '',
  };
};
