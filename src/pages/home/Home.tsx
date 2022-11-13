import { useEffect, useState } from 'react';
import { fetchUserEvents } from '../../api/events';
import { auth, signOut } from '../../utils/firebase'
import useAsyncEffect from 'use-async-effect';
import { FriendlyEvent } from '../../utils/types';
import { Navigate } from 'react-router-dom'

export const Home = () => {
  const user = auth.currentUser;
  const [events, setEvents] = useState<FriendlyEvent[]>([]);

  useAsyncEffect(async () => {
    if (user) {
      const events = await fetchUserEvents(user?.uid)
      console.log(events);
      if (events.data) {
        setEvents(events.data as FriendlyEvent[]);
      }
      
    }
  }, [user]);


  const logOut = async () => {
    signOut();
  }
  

  return (
    <div>
      <div>your name is {user?.displayName}</div>
      <div>your events are</div>
      <div>
        <div>{events.map(e => {
          return (
            <div>
              <div>{e.name}</div>
              <a href={`/events/${e.id}`}>Open event page</a>
            </div>
          )
        })}</div>
      </div>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}