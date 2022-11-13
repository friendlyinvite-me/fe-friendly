import { useState } from 'react';
import { fetchUserEvents } from '../../api/events';
import { auth, signOut } from '../../utils/firebase'
import useAsyncEffect from 'use-async-effect';
import { FriendlyEventRow } from '../../utils/types';

export const Home = () => {
  const user = auth.currentUser;
  const [events, setEvents] = useState<FriendlyEventRow[]>([]);

  useAsyncEffect(async () => {
    if (user) {
      const events = await fetchUserEvents(user?.uid)
      if (events.data) {
        setEvents(events.data as FriendlyEventRow[]);
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
            <div key={e.id}>
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