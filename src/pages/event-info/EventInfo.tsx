import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button, Card, Text } from '../../components';
import { Tab, Tabs } from '../../components/Tabs';
import { UserContext } from '../../contexts/auth-context';
import { styled } from '../../styles';
import moment from 'moment';
import toast from 'react-hot-toast';

import { FriendlyEventData, FriendlyEventResponse  } from '../../utils/types';
import { EventSuggestionCard } from '../../components/EventSuggestionCard';
import { useEventInfo } from '../../hooks/use-event-info';
import { Modal } from '../../components/Modal';

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
    onUndoVote,
    onUpvote,
    onDownvote,
    onDeleteEvent,
    onCreateEventResponse,
  } = useEventInfo(eventId);

  const [addingNewProposal, setAddingNewProposal] = useState(false);

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

  const addNewProposal = () => {
    setAddingNewProposal(true);
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
                isCreatedByUser ? <span>You created this event</span> : <span>Created by {event?.createdBy?.name}</span>
              }
              <span>{` ${moment(event.createdAt).fromNow()}`}</span>
            </Text>
          </div>
          <Button sentiment='secondary' onClick={onDeleteEventHandler}>Delete Event</Button>
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
                    data={suggestion}
                    onUpvote={() => onUpvote(suggestion.id)}
                    onDownvote={() => onDownvote(suggestion.id)}
                    onUndoVote={() => onUndoVote(suggestion.id)}
                  />
                ))
              }
              <Button onClick={addNewProposal}>Add new</Button>
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
                    data={suggestion}
                    onUpvote={() => onUpvote(suggestion.id)}
                    onDownvote={() => onDownvote(suggestion.id)}
                    onUndoVote={() => onUndoVote(suggestion.id)}
                  />
                    
                ))
              }
            </TabListWrapper>
          )
        }
        {
          tab === 'history' && (
            <div>
              {
                ((event?.responses) as FriendlyEventResponse[] ?? []).map((eventResponse, i) => (
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
        <Button disabled={eventResponse.actions.length === 0} onClick={submitEventResponse}>Submit my {eventResponse.actions.length} actions</Button>
        {
          addingNewProposal && (
            <Modal onDismiss={() => {
              setAddingNewProposal(false);
            }} isOpen>Test123</Modal>
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