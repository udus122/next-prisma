import * as React from 'react';
import styled from '@emotion/styled';
import SignIn from '@/components/SignIn';

const Container = styled.div({
  margin: '16px',
  padding: '16px',
});

const Index: React.FC = () => {
  return (
    <Container>
      <h1>Hello next-prisma</h1>
      <SignIn />
    </Container>
  );
};

export default Index;
