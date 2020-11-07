import { IUser } from './user';

export interface IPost {
  id: number;
  content: string;
  createdAt: Date;
  author: IUser;
}

export type IPostBody = Omit<IPost, 'id'>;
