import * as React from 'react';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import styled from '@emotion/styled';
import { Button, Card } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { AuthContext } from '@/components/Auth';
import { createPost } from '@/libs/api/post';
import { IPost } from '@/libs/model/post';

const FormContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '16px',
  button: {
    margin: '8px',
  },
});

interface IProps {
  addNewPost: (post: IPost) => void;
}

const PostCreator: React.FC<IProps> = ({ addNewPost }) => {
  const { currentUser } = React.useContext(AuthContext);
  return (
    <React.Fragment>
      {currentUser && (
        <Card>
          <Formik
            initialValues={{ content: '' }}
            validationSchema={Yup.object({
              content: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const createdPost = await createPost({
                content: values.content,
                authorId: currentUser.id,
              });
              addNewPost(createdPost);
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormContainer>
                  <Field
                    name="content"
                    component={TextField}
                    label="Post"
                    fullWidth
                    multiline
                    variant="filled"
                    placeholder="Please input text..."
                    InputProps={{ disableUnderline: true }}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Send
                  </Button>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </Card>
      )}
    </React.Fragment>
  );
};

export default PostCreator;
