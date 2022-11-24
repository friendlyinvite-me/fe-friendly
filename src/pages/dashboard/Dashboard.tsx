import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/auth-context';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card } from '../../components';
import { styled } from '../../styles';
import { Text } from '../../components';
import { Button } from '../../components';
import useAsyncEffect from 'use-async-effect';
import { fetchUserEvents } from '../../api';
import { FriendlyEventRow } from '../../utils/types';
import { EmptyState } from '../../components/EmptyState';
import { EventCard } from '../../components/EventCard';

export const Dashboard: React.FC = () => {
  const {user, isLoading: isLoadingUser} = useContext(UserContext); 
  const [events, setEvents] = useState<FriendlyEventRow[]>([]);
  const navigate = useNavigate();

  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  
  useAsyncEffect(async () => {
    if (user) {
      const events = await fetchUserEvents(user.id);
      if (events.length) {
        setEvents(events);
      }
      setIsLoadingEvents(false);
    }
  }, [user]);
  
  if (!isLoadingUser && !user) {
    return <Navigate to="/login" />;
  }

  const createAnEvent = () => {
    navigate('/create-an-event');
  };
  
  return (
    <>
      <DashboardHeader>
        <Tabs>
          <Tab sentiment='selected'>Hello{user ? `, ${user.displayName}` : ''}</Tab>
        </Tabs>
        <Button onClick={createAnEvent}>Create a new event</Button>
      </DashboardHeader>
      <Card>
        {
          isLoadingEvents && <div>Loading...</div>
        }
        {
          !isLoadingEvents &&
          <>
            {events.length ? (
              <EventCardsWrapper>
                {events.map(e => {
                  return (
                    <EventCard key={e.id} event={e}/>
                  );
                })}
              </EventCardsWrapper>
            ) : (
              <EmptyState
                title='You have nothing here, create a new event.'
                action={<Button onClick={createAnEvent}>Create event</Button>}
              />
            )}
          </>
        }
        
      </Card>
    </>
  );
};

const DashboardHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$4',
  alignItems: 'center',
  justifyContent: 'space-between',
});


const Tabs = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$4',
  alignItems: 'center',
  justifyContent: 'start',
  marginBlock: '$6',
});


const Tab = styled('button', {
  display: 'inline-block',
  typography: 'h4',
  color: 'white',
  margin: 0,
  backgroundColor: 'transparent',
  padding: 0,
  border: 0,
  outline: 0,
  position: 'relative',

  '&:after': {
    top: 'calc(100% + 10px)',
    left: 0,
    width: '15px',
    height: '5px',
    borderRadius: '15px',
    backgroundColor: '$yellow500',
    content: '',
    position: 'absolute',
  },

  variants: {
    sentiment: {
      default: {
        fontWeight: 400,
        opacity: 0.5,
        
        '&:after': {
          backgroundColor: 'transparent',
        },
      },
      selected: {
        fontWeight: 700,

      },
    },
  },
});
const EventCardsWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  alignItems: 'start',
  gap :'$4',
  width: '100%',

  '@md': {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  '@lg': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});