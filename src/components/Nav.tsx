import { Link } from "react-router-dom";
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../contexts/auth-context';
export const Nav = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const {user} = useContext(UserContext);  


  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Landing</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      {
        user && (
          <li>
            <button onClick={() => {
              logOut();
              navigate('/')
            }}>Log out</button>
          </li>
        )
      }
    </nav>
  )
}