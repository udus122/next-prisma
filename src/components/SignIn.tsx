import { AuthContext } from '@/components/Auth';
import firebase from '@/libs/firebase';
import { Button, CircularProgress } from '@material-ui/core';
import * as React from 'react';

const SignIn: React.FC = () => {
  const auth = React.useContext(AuthContext);

  console.log(auth);

  const handleClickGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const handleClickGoogleSignOut = () => {
    firebase.auth().signOut();
    auth.signOut();
  };

  return (
    <React.Fragment>
      <h2>Sign In.↓↓↓</h2>
      {auth.isInitialized &&
        (auth.currentUser ? (
          <p>
            Your name: {auth.currentUser.name}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClickGoogleSignOut()}
            >
              Sign out
            </Button>
          </p>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClickGoogleSignIn()}
          >
            Sign in
          </Button>
        ))}
      {!auth.isInitialized && <CircularProgress />}
    </React.Fragment>
  );
};

export default SignIn;
