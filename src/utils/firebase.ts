// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { createUser } from '../api';
import { NewFriendlyUserCreation } from './types';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);

export const onAuthStateChange = (callback: (...arg: any) => void) => {
  return onAuthStateChanged(auth, user => {
    if (user) {
      callback({ loggedIn: true, user });
    } else {
      callback({ loggedIn: false });
    }
  });
};

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const data: NewFriendlyUserCreation = {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    };

    await createUser(data);

  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export const signOut = async () => {
  await auth.signOut();
};