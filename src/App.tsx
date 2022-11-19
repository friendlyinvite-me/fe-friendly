import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import './App.css';
import { onAuthStateChange } from './utils/firebase';
import { Outlet } from "react-router-dom";
import { UserContext } from './contexts/auth-context';
import { Nav } from './components/Nav';
import { styled } from './styles';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = onAuthStateChange(response => {
      if (response.loggedIn) {
        
        setCurrentUser(response.user);
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    // when we unmount, check again
    return () => {
      checkUserSession();
    }
  }, []);

  return (
    <UserContext.Provider value={
      {
        user: currentUser,
        isLoading
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
    backgroundColor: '#d8d8d8',
    zIndex: 0
  }
});

const AppContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  gap: '$5',
  flex: 1,
  zIndex: 1
})



export default App;
