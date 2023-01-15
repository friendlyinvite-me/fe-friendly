import { User as FirebaseUser } from 'firebase/auth';
import React, { useState } from 'react';
import './App.css';
import { onAuthStateChange } from './utils/firebase';
import { Outlet } from "react-router-dom";
import { UserContext } from './contexts/auth-context';
import { Nav } from './components';
import useAsyncEffect from 'use-async-effect';
import { styled } from './styles';
import { fetchUser } from './api';
import { User } from './utils/types';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          name: friendlyUser?.name as string,
          email: friendlyUser?.email as string,
        });

        /**
         * if has redirectTo somewhere
         * redirect there
         */
        const redirectTo = new URLSearchParams(window.location.search).get('redirectTo');
        if (redirectTo) {
          window.location.href = redirectTo;
        }
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
        <Toaster position='top-center' toastOptions={{
          style: {
            fontWeight: 700,
          },
        }}>
          {(t) => (
            <ToastBar style={{
              padding: '15px',
              alignItems: 'start',
              gap: '10px',
              maxWidth: '400px',
            }} toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  <ToastText>
                    {message}
                  </ToastText>
                  {t.type !== 'loading' && (
                    <ToastDismiss onClick={() => toast.dismiss(t.id)}>
                      <FontAwesomeIcon icon={faXmark} />
                    </ToastDismiss>
                  )}
                </>
              )}
            </ToastBar>
          )}

        </Toaster>
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
  justifyContent: 'center',

  '&:after': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '40%',
    backgroundColor: '#030511',
    zIndex: 0,
  },
});

const AppContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  gap: '$5',
  '@md': {
    gap: '$10',
  },
  flex: 1,
  zIndex: 1,
  maxWidth: '650px',
});

const ToastText = styled('div', {
  typography: 'p',
  fontWeight: '700',
  '& > div': {
    margin: 0,
  },
});

const ToastDismiss = styled('div', {
  cursor: 'pointer',
  opacity: 0.7,
  '&:hover': {
    opacity: 1,
  },
});


export default App;
