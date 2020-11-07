import { IUserBody } from '@/libs/model/user';
import { functions } from '@/libs/firebase';

export const create = async (body: IUserBody) => {
  try {
    const func = functions.httpsCallable('createUser');
    const result = await func(body);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
