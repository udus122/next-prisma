import { IPost } from '@/libs/model/post';
import { functions } from '@/libs/firebase';

export const getList = async (): Promise<IPost[]> => {
  try {
    const func = functions.httpsCallable('getPostList');
    const result = await func();
    console.log(result);
    return result.data as IPost[];
  } catch (e) {
    throw new Error(e);
  }
};
