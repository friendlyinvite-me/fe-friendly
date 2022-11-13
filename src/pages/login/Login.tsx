import { signInWithGoogle } from '../../utils/firebase';

export const Login = () => {

  const signIn = () => {
    signInWithGoogle();
  }
  return (
    <button onClick={signIn}>click here to login</button>
  )
}