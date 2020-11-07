import * as React from 'react';
import { GetStaticProps } from 'next';
import styled from '@emotion/styled';
import { getList as getPostList } from '@/libs/api/post';
import SignIn from '@/components/SignIn';
import { IPost } from '@/libs/model/post';
import PostCreator from '@/components/PostCreator';

const Container = styled.div({
  margin: '16px',
  padding: '16px',
});

interface IProps {
  posts: IPost[];
}

const Index: React.FC<IProps> = ({ posts }) => {
  console.log(posts);
  return (
    <Container>
      <h1>Hello next-prisma</h1>
      <SignIn />
      <PostCreator />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const posts = await getPostList();
  return {
    props: {
      posts,
    },
    revalidate: 1, // In seconds
  };
};

export default Index;
