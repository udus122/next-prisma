/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as functions from 'firebase-functions';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export interface ICreateUserData {
  email: string;
  name: string;
  avatarUrl: string;
}

export const createUser = functions.https.onCall(
  async (
    data: ICreateUserData,
    context: functions.https.CallableContext,
  ): Promise<User> => {
    try {
      const result: User = await prisma.user.create({
        data,
      });
      return result;
    } catch (e) {
      throw new functions.https.HttpsError('internal', e.message, e);
    }
  },
);
