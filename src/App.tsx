import { User as FirebaseUser } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import './App.css';
import { onAuthStateChange } from './utils/firebase';
import { Outlet } from "react-router-dom";
import { UserContext } from './contexts/auth-context';
import { Nav } from './components';
import useAsyncEffect from 'use-async-effect';
import { styled } from './styles';
import { fetchUser } from './api';
import { User } from './utils/types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(currentUser);
  

  useAsyncEffect(async () => {
    const checkUserSession = onAuthStateChange(async (response: {
      loggedIn: boolean;
      user: FirebaseUser | null
    }) => {
      if (response.loggedIn && response.user) {
        let friendlyUser = null;
        if (response.user?.email) {
          friendlyUser = await fetchUser(response.user.email);
        }
        setCurrentUser({
          ...response.user,
          id: friendlyUser?.id as string,
        });
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    // when we unmount, check again
    return () => {
      checkUserSession();
    };
  }, []);

  return (
    <UserContext.Provider value={
      {
        user: currentUser,
        isLoading,
      }
    }>
      <AppWrapper>
        <AppContent>
          <Nav />
          <Outlet />
        </AppContent>
      </AppWrapper>
    </UserContext.Provider>
  );
}

const AppWrapper = styled('div', {
  paddingInline: '5%',
  paddingBlock: '3%',
  paddingBlockEnd: '0',
  backgroundColor: '$appBackground',
  minHeight: '100vh',
  display: 'flex',

  '&:after': {
    content: '',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '70%',
    backgroundColor: '$gray100',
    zIndex: 0,
  },
});

const AppContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  gap: '$5',
  flex: 1,
  zIndex: 1,
});



export default App;
