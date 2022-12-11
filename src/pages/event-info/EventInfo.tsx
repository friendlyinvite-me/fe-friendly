import React, { useContext, useMemo, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { deleteEvent } from '../../api';
import { Button, Card, Text } from '../../components';
import { DateTimePicker } from '../../components/DateTimePicker';
import { EventDateTimeCard } from '../../components/EventDateTimeCard';
import { LocationCard } from '../../components/LocationCard';
import { Tab, Tabs } from '../../components/Tabs';
import { UserContext } from '../../contexts/auth-context';
import { styled } from '../../styles';
import moment from 'moment';

import { FriendlyEventData, Location } from '../../utils/types';

export const EventInfo: React.FC = () => {
  const data = useLoaderData() as FriendlyEventData;
  const [tab, setTab] = useState<'datetime' | 'location' | 'history'>('datetime');
  const {user} = useContext(UserContext); 

  const navigate = useNavigate();

  const isCreatedByUser = data.createdBy.userId === user?.id;

  const onDeleteEvent = async () => {
    const deleted = await deleteEvent({
      userId: user?.id ?? '',
      eventId: data.id,
    });
    if (deleted) {
      alert('delted! Redirecting...');
      navigate('/dashboard');
    }
  };
  
  const locations = useMemo(() => {
    return data.suggestions.filter(s => s.type === 'location');
  }, [data]);

  const dateTimes = useMemo(() => {
    return data.suggestions.filter(s => s.type === 'datetime');
  }, [data]);
  return (
    <Card>
      <EventInfoWrapper>
        <EventInfoHeader>
          <div>
            <Text typography='h1'>{data.name}</Text>
        
            <Text typography='h4'>
              {
                isCreatedByUser ? <span>You created this event</span> : <span>Created by {data.createdBy.name}</span>
              }
              <span>{` ${moment(data.createdAt).fromNow()}`}</span>
            </Text>
          </div>
          <Button sentiment='secondary' onClick={onDeleteEvent}>Delete Event</Button>
        </EventInfoHeader>
        <Tabs>
          <Tab sentiment={tab === 'datetime' ? 'selected' : 'default'} onClick={() => setTab('datetime')}>Date & Times</Tab>
          <Tab sentiment={tab === 'location' ? 'selected' : 'default'} onClick={() => setTab('location')}>Locations</Tab>
          <Tab sentiment={tab === 'history' ? 'selected' : 'default'} onClick={() => setTab('history')}>History</Tab>
        </Tabs>
        {
          tab === 'datetime' && (
            <TabListWrapper>
              {
                dateTimes.map((dateTime) => (
                  <EventDateTimeCard
                    key={dateTime.id}
                    data={dateTime}
                  />
                ))
              }
            </TabListWrapper>
          )
        }
        {
          tab === 'location' && (
            <TabListWrapper>
              {
                locations.map((location, i) => (
                  <LocationCard key={location.id}  location={location.value as Location}/>
                    
                ))
              }
            </TabListWrapper>
          )
        }
        {
          tab === 'history' && (
            <div>
              {
                data.responses.map((eventResponse, i) => (
                  <div key={i}>
                    <div>=====RESPONSE======</div>
                    <div>{eventResponse.user?.name}</div>
                    <div>{eventResponse.comments}</div>
                    <div>did the following actions</div>
                    <div>
                      {
                        eventResponse.actions.map((action, j) => {
                          return (
                            <div key={j}>
                              <div>type: {action.type}</div>
                              <div>value: {typeof action.value === 'object' ? action.value.name : action.value}</div>
                            </div>
                          );
                        })
                      }
                    </div>
                    <br />
                  </div>
                ))
              }
            </div>
          )
        }
      </EventInfoWrapper>
    </Card>
  );
};

const EventInfoWrapper = styled('div', {
  width: '100%',
});

const EventInfoHeader = styled('div', {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  width: '100%',
});

const TabListWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});