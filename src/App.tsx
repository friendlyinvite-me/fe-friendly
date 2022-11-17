import { User } from 'firebase/auth';
import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import { onAuthStateChange } from './utils/firebase';
import { Outlet } from "react-router-dom";
import { UserContext } from './contexts/auth-context';
import { Nav } from './components/Nav';

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
      <Nav />
     <Outlet />
    </UserContext.Provider>
  );
}

export default App;
