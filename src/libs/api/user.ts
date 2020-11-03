import { IUserBody } from '@/libs/model/user';

export const create = async (body: IUserBody) => {
  try {
    const res = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
