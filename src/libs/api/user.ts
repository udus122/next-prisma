import { IGetParams, IUser, IUserBody } from '@/libs/model/user';
import { functions } from '@/libs/firebase';

export const get = async (getParams: IGetParams): Promise<IUser> => {
  try {
    const func = functions.httpsCallable('getUser');
    const result = await func(getParams);
    return result.data as IUser;
  } catch (e) {
    throw new Error(e);
  }
};

export const create = async (body: IUserBody): Promise<IUser> => {
  try {
    const func = functions.httpsCallable('createUser');
    const result = await func(body);
    return result.data as IUser;
  } catch (e) {
    throw new Error(e);
  }
};
