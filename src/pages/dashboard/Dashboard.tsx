/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useMemo, useState } from 'react';
import { UserContext } from '../../contexts/auth-context';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, Text } from '../../components';
import { styled } from '../../styles';
import { Button } from '../../components';
import useAsyncEffect from 'use-async-effect';
import { fetchUserEvents } from '../../api';
import { FriendlyEventRow } from '../../utils/types';
import { EmptyState } from '../../components/EmptyState';
import { EventCard } from '../../components/EventCard';
import { Tab, Tabs } from '../../components/Tabs';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const Dashboard: React.FC = () => {
  const {user, isLoading: isLoadingUser} = useContext(UserContext); 
  const [events, setEvents] = useState<FriendlyEventRow[]>([]);
  const [myEvents, setMyEvents] = useState<FriendlyEventRow[]>([]);
  const navigate = useNavigate();

  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  const [tab, setTab] = useState<'my-events' | 'all-events'>('all-events');

  
  useAsyncEffect(async () => {
    if (user) {
      const userCreatedEvents = await fetchUserEvents(user.id, true);
      const allEvents = await fetchUserEvents(user.id, false);
      if (userCreatedEvents.length) {
        setMyEvents(userCreatedEvents);
      }
      if (allEvents.length) {
        setEvents(allEvents);
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

  const eventsToShow = useMemo(() => {
    return tab === 'all-events' ? events : myEvents;
  }, [tab, isLoadingEvents]);
  
  return (
    <>
      <DashboardHeader>
        <Tabs>
          <Tab sentiment='selected'>
            <Text typography='h3' color='white'>Hello{user ? `, ${user.displayName}` : ''}</Text>
          </Tab>
        </Tabs>
        <Button onClick={createAnEvent}>Create a new event</Button>
        
      </DashboardHeader>
      <Tabs>
        <Tab onClick={() => setTab('all-events')} sentiment={tab === 'all-events' ? 'selected' : 'default'}>
          <Text typography='h3' color='white'>All events</Text>
        </Tab>
        <Tab onClick={() => setTab('my-events')} sentiment={tab === 'my-events' ? 'selected' : 'default'}>
          <Text typography='h3' color='white'>Events I've created</Text>
        </Tab>
      </Tabs>
      <Card>
        {
          isLoadingEvents && <LoadingSpinner title="Loading your events..." />
        }
        {
          !isLoadingEvents &&
          <>
            {
              eventsToShow.length ? (
                <EventCardsWrapper>
                  {eventsToShow.map(e => {
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
              )
            }
          </>
        }
        
      </Card>
    </>
  );
};

const DashboardHeader = styled('div', {
  display: 'flex',
  gap: '$4',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'start',

  button: {
    width: '100%',
  },

  '@md': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    button: {
      width: 'auto',
    },
  },
});


const EventCardsWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  alignItems: 'start',
  justifyContent:'start',
  gap :'$4',
  width: '100%',

  '@md': {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

});