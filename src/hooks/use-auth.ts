import { signInWithGoogle, signOut, } from '../utils/firebase';

export const useAuth = () => {

  return {
    logInWithGoogle: signInWithGoogle,
    logOut: signOut,
  };
};
