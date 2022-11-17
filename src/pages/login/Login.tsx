import { Nav } from '../../components/Nav';
import { useAuth } from '../../hooks/use-auth';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/auth-context';

export const Login = () => {
  const { logInWithGoogle } = useAuth();
  const {user, isLoading} = useContext(UserContext);  

  if (user) {
    return <Navigate to='/dashboard' />
  }
  
  return (
    <>
      <button onClick={logInWithGoogle}>click here to login</button>
    </>
  )
}