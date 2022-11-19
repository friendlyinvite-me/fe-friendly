import { Link } from "react-router-dom";
import { useAuth } from '../hooks/use-auth';
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../contexts/auth-context';
import { styled } from '../styles';
import { Text } from './Text';

export const Nav = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {user} = useContext(UserContext);  


  return (
    <NavWrapper>
      <Text typography='h2' color='white'>Friendly</Text>
      <NavLinks>
        <NavLink variant={location.pathname === '/' ? 'selected' : 'default'} to="/">Landing</NavLink>
        { user ?
          <NavLink variant={location.pathname === '/dashboard' ? 'selected' : 'default'} to="/dashboard">Dashboard</NavLink> :
          <NavLink variant={location.pathname === '/login' ? 'selected' : 'default'} to="/login">Login</NavLink>
        }
        {
          user && (
            <LogOutButton onClick={() => {
              logOut();
              navigate('/')
            }}>Log out</LogOutButton>
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
  textDecoration: 'none',
  variants: {
    variant: {
      default: {},
      selected: {
        fontWeight: 700,
      },
    }
  }
})

const LogOutButton = styled('button', {
  border: '2px solid white',
  color: 'white',
  typography: 'p',
  cursor: 'pointer',
  fontWeight: 700,
  outline: 0,
  padding: '$1 $2',
  borderRadius: '20px',
  backgroundColor: 'transparent'
})