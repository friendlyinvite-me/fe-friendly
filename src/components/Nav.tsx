import { Link } from "react-router-dom";
import { useAuth } from '../hooks/use-auth';
import { useNavigate, useLocation } from "react-router-dom";
import React, { Fragment, useContext, useMemo } from 'react';
import { UserContext } from '../contexts/auth-context';
import { styled } from '../styles';
import { Logo } from './Logo';
import { useWindowSize } from '../hooks/use-window-resize';
import { Menu } from '@headlessui/react';
import { Text } from './Text';
import { Popover } from './Popover';

export const Nav: React.FC = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const {user} = useContext(UserContext);

  const userInfo = useMemo(() => {
    if (user) {
      return (
        <div>
          <Text typography='h3'>{user.displayName}</Text>
          <Text typography='h4'>{user.email}</Text>
        </div>
      );
    }
    return null;
  }, [user]);

  const logoutButton = (
    <LogoutButton onClick={() => {
      logOut();
      navigate('/');
    }}>Log out</LogoutButton>
  );


  return (
    <NavWrapper>
      <NavLink variant={location.pathname === '/' ? 'selected' : 'default'} to={user ? "/dashboard" : "/"}>
        <Logo iconOnly={width < 500} color={['#E9E70D']} height={25} />
      </NavLink>
      
      <NavLinks>
        { user ?
          <NavLink variant={location.pathname === '/dashboard' ? 'selected' : 'default'} to="/dashboard">Dashboard</NavLink> :
          <NavLink variant={location.pathname === '/login' ? 'selected' : 'default'} to="/login">Login</NavLink>
        }
        {
          user && (
            <Popover
              activator={<UserDropdownActivator>Profile</UserDropdownActivator>}
              items={
                [
                  userInfo,
                  logoutButton,
                ]
              }
            />

              

            
          )
        }
      </NavLinks>
    </NavWrapper>
  );
};

const NavWrapper = styled('nav', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$5',
});
const NavLinks = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$3',
  alignItems: 'center',
  color: 'white',
});

const UserDropdownActivator = styled('div', {
  border: '2px solid white',
  typography: 'p',
  cursor: 'pointer',
  fontWeight: 700,
  outline: 0,
  padding: '$1 $2',
  borderRadius: '20px',
  backgroundColor: '$contentPrimary',
  color: 'white',
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
    },
  },
});

const LogoutButton = styled('div', {
  border: '2px solid black',
  color: '$contentPrimary',
  textAlign: 'center',
  typography: 'p',
  cursor: 'pointer',
  fontWeight: 700,
  outline: 0,
  padding: '$1 $2',
  borderRadius: '20px',
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: '$red500',
  },
});
