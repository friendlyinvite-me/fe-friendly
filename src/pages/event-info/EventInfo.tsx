import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { deleteEvent } from '../../api';
import { Button, Card, Text } from '../../components';
import { Tab, Tabs } from '../../components/Tabs';
import { UserContext } from '../../contexts/auth-context';
import { styled } from '../../styles';
import moment from 'moment';

import { FriendlyEventData, Location, NewEventResponseData  } from '../../utils/types';
import { EventSuggestionCard } from '../../components/EventSuggestionCard';

export const EventInfo: React.FC = () => {
  const data = useLoaderData() as FriendlyEventData;
  const [tab, setTab] = useState<'datetime' | 'location' | 'history'>('datetime');
  const {user} = useContext(UserContext); 

  const [eventResponse, setEventResponse] = useState<NewEventResponseData>({
    eventId: data.id,
    userId: user?.id ?? '',
    actions: [],
    comment: '',
  });

  /**
   * When eventResponse change
   * Update the event
   */
  const event = useMemo(() => {
    const event = {...data};
    console.log('data is', data);
    console.log('calc event');
    
    
    eventResponse.actions.map(action => {
      console.log('action', action);
      
      switch (action.type) {
        case 'upvote': {
          event.suggestions = event.suggestions.map(suggestion => {
            if (suggestion.id === action.value) {
              return {
                ...suggestion,
                upvotes: [...suggestion.upvotes.filter(u => u !== user!.id), user!.id],
                downvotes: suggestion.downvotes.filter(u => u !== user!.id),
              };
            }
            return suggestion;
          });
          break;
        }
          
        case 'downvote': {
          event.suggestions = event.suggestions.map(suggestion => {
            if (suggestion.id === action.value) {
              return {
                ...suggestion,
                downvotes: [...suggestion.downvotes.filter(u => u !== user!.id), user!.id],
                upvotes: suggestion.upvotes.filter(u => u !== user!.id),
              };
            }
            return suggestion;
          });
          break;
        }
      
        default:
          break;
      }
    });

    return event;
  }, [data, eventResponse]);

  const navigate = useNavigate();

  const isCreatedByUser = event.createdBy.userId === user?.id;

  const onDeleteEvent = async () => {
    const deleted = await deleteEvent({
      userId: user?.id ?? '',
      eventId: event.id,
    });
    if (deleted) {
      alert('deleted! Redirecting...');
      navigate('/dashboard');
    }
  };

  const locationSuggestions = event.suggestions.filter(s => s.type === 'location');

  const dateTimeSuggestions = event.suggestions.filter(s => s.type === 'datetime');

  const onUpvote = (suggestionId: string) => {
    let actions = eventResponse.actions;
    actions = actions.filter(action => {
      if (action.type === 'downvote' || action.type === 'upvote') {
        return action.value !== suggestionId;
      }
      return true;
    });
    actions.push({
      type:'upvote',
      value: suggestionId,
    });
    setEventResponse({
      ...eventResponse,
      actions,
    });
  };
  const onDownvote = (suggestionId: string) => {
    let actions = eventResponse.actions;
    actions = actions.filter(action => {
      if (action.type === 'downvote' || action.type === 'upvote') {
        return action.value !== suggestionId;
      }
      return true;
    });
    actions.push({
      type:'downvote',
      value: suggestionId,
    });
    setEventResponse({
      ...eventResponse,
      actions,
    });
  };

  const onUndoVote = (suggestionId: string) => {
    let actions = eventResponse.actions;
    actions = actions.filter(action => {
      if (action.type === 'downvote' || action.type === 'upvote') {
        return action.value !== suggestionId;
      }
      return true;
    });
    
    setEventResponse({
      ...eventResponse,
      actions,
    });
  };

  return (
    <Card>
      <EventInfoWrapper>
        <EventInfoHeader>
          <div>
            <Text typography='h1'>{event.name}</Text>
        
            <Text typography='h4'>
              {
                isCreatedByUser ? <span>You created this event</span> : <span>Created by {event.createdBy.name}</span>
              }
              <span>{` ${moment(event.createdAt).fromNow()}`}</span>
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
                event.responses.map((eventResponse, i) => (
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
        <Button>Submit my {eventResponse.actions.length} actions</Button>
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