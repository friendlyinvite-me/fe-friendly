// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { query, collection, getFirestore, where, getDocs, addDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAqA0Q-9RZEnZ_cYlcOy56Sp-IqvkaXnus",
  authDomain: "friendly-356420.firebaseapp.com",
  projectId: "friendly-356420",
  storageBucket: "friendly-356420.appspot.com",
  messagingSenderId: "488937697325",
  appId: "1:488937697325:web:bf7183e4e6d847e598c8a4",
  measurementId: "G-3N02XKMQZQ"
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
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export const signOut = async () => {
  await auth.signOut();
};