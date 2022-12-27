import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button, Card, Text } from '../../components';
import { Tab, Tabs } from '../../components/Tabs';
import { UserContext } from '../../contexts/auth-context';
import { styled } from '../../styles';
import moment from 'moment';
import toast from 'react-hot-toast';

import { FriendlyEventResponse, FriendlyEventResponseActionDateTime, FriendlyEventResponseActionLocation, Location, ProposalType  } from '../../utils/types';
import { EventSuggestionCard } from '../../components/EventSuggestionCard';
import { useEventInfo } from '../../hooks/use-event-info';
import { Modal } from '../../components/Modal';
import { DateTimeStep } from '../create-an-event/steps/DateTimeStep';
import { LocationStep } from '../create-an-event/steps/LocationStep';
import { AddNewSuggestionCard } from '../../components/AddNewSuggestionCard';
import { FlexWrapper } from '../../components/FlexWrapper';

export const EventInfo: React.FC = () => {
  const { eventId } = useLoaderData() as { eventId: string };
  const [tab, setTab] = useState<'datetime' | 'location' | 'history'>('datetime');
  
  const { user } = useContext(UserContext);

  const {
    isLoading,
    event,
    eventResponse,
    isCreatedByUser,
    dateTimeSuggestions,
    locationSuggestions,
    myDateTimeSuggestions,
    myLocationSuggestions,
    onUndoVote,
    onUpvote,
    onDownvote,
    onDeleteEvent,
    onCreateEventResponse,
    onAddDateTimeSuggestions,
    onAddLocationSuggestions,
  } = useEventInfo(eventId);

  const [addingNewProposal, setAddingNewProposal] = useState<ProposalType | undefined>(undefined);

  const navigate = useNavigate();

  const onDeleteEventHandler = async () => {
    const deleted = await onDeleteEvent({
      userId: user?.id ?? '',
      eventId: event?.id ?? '',
    });
    if (deleted) {
      alert('deleted! Redirecting...');
      navigate('/dashboard');
    }
  };


  const submitEventResponse = async () => {
    await onCreateEventResponse({...eventResponse, userId: user!.id});
    toast.success('Thank you for your submission. Your response will be sent to everyone else!');
  };

  const addNewProposal = (type: ProposalType) => {
    setAddingNewProposal(type);
  };

  if (isLoading) {
    return (
      <Card>
        <Text typography='h1'>Loading...</Text>
      </Card>
    );
  }

  return (
    <Card>
      <EventInfoWrapper>
        <EventInfoHeader>
          <div>
            <Text typography='h1'>{event.name}</Text>
        
            <Text typography='h4'>
              {
                isCreatedByUser ? <span>You created this event</span> : <span>Created by {event?.user?.name}</span>
              }
              <span>{` ${moment(event.createdAt).fromNow()}`}</span>
            </Text>
          </div>
          <FlexWrapper>
            { isCreatedByUser &&
              <Button sentiment='secondary' onClick={onDeleteEventHandler}>Delete Event</Button>
            }
            <Button disabled={eventResponse.actions.length === 0} onClick={submitEventResponse}>Submit</Button>
          </FlexWrapper>
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
                dateTimeSuggestions.map((suggestion) => (
                  <EventSuggestionCard
                    key={suggestion.id}
                    data={{
                      ...suggestion,
                      title: moment(suggestion.value as string).format('Do MMM y   h:mm a'),
                    }}
                    onUpvote={() => onUpvote(suggestion.id, user?.id ?? '')}
                    onDownvote={() => onDownvote(suggestion.id, user?.id ?? '')}
                    onUndoVote={() => onUndoVote(suggestion.id, user?.id ?? '')}
                  />
                ))
              }
              {
                myDateTimeSuggestions.map(suggestion => (
                  <EventSuggestionCard
                    key={suggestion.id}
                    data={{
                      ...suggestion,
                      upvotes: [],
                      downvotes: [],
                      title: moment(suggestion.value as string).format('Do MMM y   h:mm a'),
                    }}
                  />
                  
                ))
              }
              <AddNewSuggestionCard onClick={() => addNewProposal('datetime')} type='datetime' />
            </TabListWrapper>
          )
        }
        {
          tab === 'location' && (
            <TabListWrapper>
              {
                locationSuggestions.map((suggestion) => (
                  <EventSuggestionCard
                    key={suggestion.id}
                    data={{
                      ...suggestion,
                      title: (suggestion.value as Location).name,
                    }}
                    onUpvote={() => onUpvote(suggestion.id, user?.id ?? '')}
                    onDownvote={() => onDownvote(suggestion.id, user?.id ?? '')}
                    onUndoVote={() => onUndoVote(suggestion.id, user?.id ?? '')}
                  />
                    
                ))
              }
              {
                myLocationSuggestions.map(suggestion => (
                  <EventSuggestionCard
                    key={suggestion.id}
                    data={{
                      ...suggestion,
                      upvotes: [],
                      downvotes: [],
                      title: suggestion.value.name,
                    }}
                  />
                ))
              }
              <AddNewSuggestionCard onClick={() => addNewProposal('location')} type='location' />
            </TabListWrapper>
          )
        }
        {
          tab === 'history' && (
            <div>
              {
                ((event?.responses) as FriendlyEventResponse[] ?? []).sort((a,b) => {
                  return (
                    new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
                  );
                } ).map((eventResponse, i) => (
                  <div key={i}>
                    <div>=====RESPONSE======</div>
                    <div>{eventResponse.user?.name}</div>
                    <div>{moment(eventResponse.createdAt).fromNow()}</div>
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
        {
          addingNewProposal && (
            <Modal
              isOpen
              onDismiss={() => {
                setAddingNewProposal(undefined);
              }} 
            >
              {
                addingNewProposal === 'datetime' && (
                  <DateTimeStep
                    dateTimes={eventResponse.actions.filter(action => action.type === 'datetime').map(d => ({...d, value: new Date(d.value as string)}))} 
                    onSetDateTimes={(dateTimes) => {
                      const x = dateTimes.map(d => ({
                        ...d,
                        type: 'datetime',
                        value: d.value.toString(),
                      } as FriendlyEventResponseActionDateTime));
                      onAddDateTimeSuggestions(x, user?.id ?? '');
                    }}
                  />
                )
              }
              {
                addingNewProposal === 'location' && (
                  <LocationStep
                    locations={eventResponse.actions.filter(action => action.type === 'location').map(a => a as FriendlyEventResponseActionLocation)} 
                    onSetLocations={(locations) => {
                      const x = locations.map(l => ({
                        ...l,
                        type: 'location',
                        value: l.value,
                      } as FriendlyEventResponseActionLocation));
                      onAddLocationSuggestions(x, user?.id ?? '');
                    }}
                  />
                )
              }


            </Modal>
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