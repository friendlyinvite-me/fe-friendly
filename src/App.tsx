import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { onAuthStateChange } from './utils/firebase';

function App() {
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUserSession = onAuthStateChange(response => {
      if (response.loggedIn) {
        setCurrentUser(response.user);
      } else {
        setCurrentUser(null);
      }
    });

    // when we unmount, check again
    return () => {
      checkUserSession();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
       {
        currentUser ?  <Home /> : <Login />
       }
       
      </header>
    </div>
  );
}

export default App;
