import { auth } from '../../utils/firebase'

export const Home = () => {
  const user = auth.currentUser;
  return (
    <div>your name is {user?.displayName}</div>
  )
}