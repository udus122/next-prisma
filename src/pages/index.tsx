import SignIn from '@/components/SignIn';
import * as React from 'react';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <h1>Hello next-prisma</h1>
      <SignIn />
    </React.Fragment>
  );
};

export default Home;
