import { Link } from "react-router-dom";
import { useAuth } from '../hooks/use-auth';
import { useNavigate, useLocation } from "react-router-dom";
import React, { Fragment, useContext } from 'react';
import { UserContext } from '../contexts/auth-context';
import { styled } from '../styles';
import { Logo } from './Logo';
import { useWindowSize } from '../hooks/use-window-resize';
import { Menu } from '@headlessui/react';
import { Text } from './Text';

export const Nav: React.FC = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const {user} = useContext(UserContext);


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
            <NavDropdown>
              <Menu>
                <Menu.Button>Profile</Menu.Button>
                <Menu.Items>
                  <Menu.Item>
                    <div>
                      <Text typography='h3'>{user.displayName}</Text>
                      <Text typography='h4'>{user.email}</Text>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <LogoutButton onClick={() => {
                      logOut();
                      navigate('/');
                    }}>Log out</LogoutButton>
                  </Menu.Item>
                </Menu.Items>
              </Menu>

              
            </NavDropdown>
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

const NavDropdown = styled('div', {
  position: 'relative',

  '& > button': {
    border: '2px solid white',
    color: 'white',
    typography: 'p',
    cursor: 'pointer',
    fontWeight: 700,
    outline: 0,
    padding: '$1 $2',
    borderRadius: '20px',
    backgroundColor: 'transparent',
  },

  '& > div' : {
    position: 'absolute',
    right: 0,
    top: '105%',
    backgroundColor: "white",
    border: '1px solid $borderPrimary',
    zIndex: 1,
    borderRadius: '5px',
    color: '$contentPrimary',
    padding: '$3',
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    gap: "$3",
  },
});