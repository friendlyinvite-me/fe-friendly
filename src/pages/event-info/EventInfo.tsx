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
import { EventInfoHeader } from './EventInfoHeader';
import { EventResponseCard } from '../../components/EventResponseCard';
import { LocationPreview } from '../../components/LocationPreview';

export const EventInfo: React.FC = () => {
  const { eventId } = useLoaderData() as { eventId: string };
  const [tab, setTab] = useState<'datetime' | 'location' | 'history'>('datetime');
  
  const { user } = useContext(UserContext);

  const {
    isLoading,
    event,
    eventResponse,
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
    isCreatedByUser,
    onDeleteSuggestion,
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
        <EventInfoHeader
          isCreatedByUser={isCreatedByUser}
          event={event}
          eventResponse={eventResponse}
          onDeleteEvent={onDeleteEventHandler}
          onSubmitEventResponse={submitEventResponse}
        />
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
                    type='datetime'
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
                    type='datetime'
                    key={suggestion.id}
                    onDelete={() => onDeleteSuggestion(suggestion.id, user?.id ?? '')}
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
                    type='location'
                    key={suggestion.id}
                    data={{
                      ...suggestion,
                      title: (suggestion.value as Location).name,
                      reference: (suggestion.value as Location).reference,
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
                    type='location'
                    key={suggestion.id}
                    onDelete={() => onDeleteSuggestion(suggestion.id, user?.id ?? '')}
                    data={{
                      ...suggestion,
                      upvotes: [],
                      downvotes: [],
                      title: suggestion.value.name,
                      reference: suggestion.value.reference,
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
            <TabListWrapper>
              {
                ((event?.responses) as FriendlyEventResponse[] ?? []).sort((a,b) => {
                  return (
                    new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
                  );
                } ).map((response) => (
                  <EventResponseCard response={response} key={response.id} />
                ))
              }
            </TabListWrapper>
          )
        }
        {
          addingNewProposal && (
            <Modal
              width='600px'
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
                      onAddDateTimeSuggestions(dateTimes.map(d => ({
                        ...d,
                        type: 'datetime',
                        value: d.value.toString(),
                      } as FriendlyEventResponseActionDateTime)), user?.id ?? '');
                    }}
                  />
                )
              }
              {
                addingNewProposal === 'location' && (
                  <LocationStep
                    locations={eventResponse.actions.filter(action => action.type === 'location').map(a => a as FriendlyEventResponseActionLocation)} 
                    onSetLocations={(locations) => {
                      onAddLocationSuggestions(locations.map(l => ({
                        ...l,
                        type: 'location',
                        value: l.value,
                      } as FriendlyEventResponseActionLocation)), user?.id ?? '');
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



const TabListWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
});