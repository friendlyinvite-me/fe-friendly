import React, { useContext, useMemo, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { deleteEvent } from '../../api';
import { Button, Card, Text } from '../../components';
import { DateTimePicker } from '../../components/DateTimePicker';
import { LocationCard } from '../../components/LocationCard';
import { Tab, Tabs } from '../../components/Tabs';
import { UserContext } from '../../contexts/auth-context';
import { styled } from '../../styles';

import { FriendlyEventData, FriendlyEventResponseActionDateTime, FriendlyEventResponseActionLocation } from '../../utils/types';

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
    const locationItems: FriendlyEventResponseActionLocation[] = [];
    data.responses.forEach(response => {
      response.actions.forEach(action => {
        if (action.type === 'location') {
          locationItems.push(action);
        }
      });
    });
    return locationItems;
  }, [data]);

  const dateTimes = useMemo(() => {
    const dateTimeItems: FriendlyEventResponseActionDateTime[] = [];
    data.responses.forEach(response => {
      response.actions.forEach(action => {
        if (action.type === 'datetime') {
          dateTimeItems.push(action);
        }
      });
    });
    return dateTimeItems;
  }, [data]);
  return (
    <Card>
      <EventInfoWrapper>
        <EventInfoHeader>
          <div>
            <Text typography='h1'>{data.name}</Text>
        
            <Text typography='h4'>
              {
                isCreatedByUser ? <div>You created this event</div> : <div>Created by {data.createdBy.name}</div>
              }
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
                dateTimes.map((dateTime, i) => (
                  <DateTimePicker disabled key={i} value={{
                    id: dateTime.id ?? '',
                    value: new Date(dateTime.value),
                  }} />
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
                  <LocationCard key={i}  location={location.value}/>
                    
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