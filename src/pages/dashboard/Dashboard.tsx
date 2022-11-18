import { useContext } from 'react'
import { UserContext } from '../../contexts/auth-context'
import { Navigate} from 'react-router-dom';
import { Card } from '../../components/Card';

export const Dashboard = () => {
  const {user, isLoading} = useContext(UserContext);  
  if (!isLoading && !user) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <div>Some tabs</div>
      <Card>
        <div>Dashboard</div>
      </Card>
    </>
  )
}