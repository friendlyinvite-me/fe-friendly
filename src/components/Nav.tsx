import { Link } from "react-router-dom";
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../contexts/auth-context';
import { styled } from '../styles';
import { Text } from './Text';

export const Nav = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const {user} = useContext(UserContext);  


  return (
    <NavWrapper>
      <Text typography='h2' color='white'>Friendly</Text>
      <NavLinks>
        <NavLink to="/">Landing</NavLink>
        { user ?
          <NavLink to="/dashboard">Dashboard</NavLink> :
          <NavLink to="/login">Login</NavLink>
        }
        {
          user && (
            <button onClick={() => {
              logOut();
              navigate('/')
            }}>Log out</button>
          )
        }
      </NavLinks>
    </NavWrapper>
  )
}

const NavWrapper = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$5',
})
const NavLinks = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$3',
  alignItems: 'center',
  color: 'white'
});

const NavLink = styled(Link, {
  color: 'white',
  textDecoration: 'none'
})