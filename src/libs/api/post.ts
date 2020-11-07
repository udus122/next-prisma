import { IPost } from '@/libs/model/post';
import { functions } from '@/libs/firebase';

export const getList = async (): Promise<IPost[]> => {
  try {
    const func = functions.httpsCallable('getPostList');
    const result = await func();
    return result.data.map((post: IPost) => ({
      ...post,
      createdAt: new Date(post.createdAt),
    }));
  } catch (e) {
    throw new Error(e);
  }
};
