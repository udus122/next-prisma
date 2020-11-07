import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import { config } from './config';

try {
  firebase.initializeApp(config);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export const auth = firebase.auth();
export const functions = firebase.functions();

export default firebase;
