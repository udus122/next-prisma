import { IUser } from './user';

export interface IPost {
  id: number;
  content: string;
  createdAt: Date;
  author: IUser;
}

export interface IPostBody {
  content: string;
  authorId: number;
}
