import { useContext } from 'react'
import { UserContext } from '../../contexts/auth-context'
import { Navigate} from 'react-router-dom';

export const Dashboard = () => {
  const {user, isLoading} = useContext(UserContext);  
  debugger;
  if (!isLoading && !user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <div>Dashboard</div>
    </>
  )
}