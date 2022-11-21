import React, { useState, } from 'react';
import { FriendlyEventRow, } from '../../utils/types';
import { useAuth, } from '../../hooks/use-auth';

export const Home: React.FC = () => {
  const { logOut, } = useAuth();
  const [events, setEvents,] = useState<FriendlyEventRow[]>([],);

  // useAsyncEffect(async () => {
  //   if (currentUser) {
  //     const events = await fetchUserEvents(currentUser?.uid)
  //     if (events.data) {
  //       setEvents(events.data as FriendlyEventRow[]);
  //     }
      
  //   }
  // }, [currentUser]);

  return (
    <div>
      {/* <div>your name is {currentUser?.displayName}</div> */}
      <div>your events are</div>
      <div>
        <div>{events.map(e, => {
          return (
            <div key={e.id}>
              <div>{e.name}</div>
              <a href={`/events/${e.id}`}>Open event page</a>
            </div>
          );
        },)}</div>
      </div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};