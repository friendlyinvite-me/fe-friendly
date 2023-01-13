import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components';
import { Tab, Tabs } from '../../components/Tabs';
import { UserContext } from '../../contexts/auth-context';
import { styled } from '../../styles';
import toast from 'react-hot-toast';

import { FriendlyEventResponseActionDateTime, FriendlyEventResponseActionLocation, Location, ProposalType  } from '../../utils/types';
import { useEventInfo } from '../../hooks/use-event-info';
import { Modal } from '../../components/Modal';
import { DateTimeStep } from '../create-an-event/steps/DateTimeStep';
import { LocationStep } from '../create-an-event/steps/LocationStep';
import { EventInfoHeader } from './EventInfoHeader';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EventOverview } from './tabs/EventOverview';
import { EventDateTimes } from './tabs/EventDateTimes';
import { EventLocations } from './tabs/EventLocations';
import { EventHistory } from './tabs/EventHistory';

export const EventInfo: React.FC = () => {
  const { eventId } = useLoaderData() as { eventId: string };
  const [tab, setTab] = useState<'summary' | 'datetime' | 'location' | 'history'>('summary');
  
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
      toast.success('Deleted! Redirecting...');
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
        <LoadingSpinner title="Loading event information..." />
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
          
        />
        <Tabs>
          <Tab sentiment={tab === 'summary' ? 'selected' : 'default'} onClick={() => setTab('summary')}>Overview</Tab>
          <Tab sentiment={tab === 'datetime' ? 'selected' : 'default'} onClick={() => setTab('datetime')}>Date & Times</Tab>
          <Tab sentiment={tab === 'location' ? 'selected' : 'default'} onClick={() => setTab('location')}>Locations</Tab>
          <Tab sentiment={tab === 'history' ? 'selected' : 'default'} onClick={() => setTab('history')}>History</Tab>
        </Tabs>
        {
          tab === 'summary' && (
            <TabListWrapper>
              <EventOverview event={event} />
            </TabListWrapper>
          )
        }
        {
          tab === 'datetime' && (
            <TabListWrapper>
              <EventDateTimes
                dateTimeSuggestions={dateTimeSuggestions}
                myDateTimeSuggestions={myDateTimeSuggestions}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
                onUndoVote={onUndoVote}
                onDeleteSuggestion={onDeleteSuggestion}
                onAddNewProposal={addNewProposal}
              />
            </TabListWrapper>
          )
        }
        {
          tab === 'location' && (
            <TabListWrapper>
              <EventLocations
                locationSuggestions={locationSuggestions}
                myLocationSuggestions={myLocationSuggestions}
                onUpvote={onUpvote}
                onDownvote={onDownvote}
                onUndoVote={onUndoVote}
                onDeleteSuggestion={onDeleteSuggestion}
                onAddNewProposal={addNewProposal}
              />
            </TabListWrapper>
          )
        }
        {
          tab === 'history' && (
            <TabListWrapper>
              <EventHistory event={event} />
            </TabListWrapper>
          )
        }
        <Button size='large' disabled={eventResponse.actions.length === 0} onClick={submitEventResponse}>
          {
            eventResponse.actions.length ? 'Submit my response' : 'Respond by adding suggestions or upvote/downvoting existing suggestions'
          }
        </Button>

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
  display: 'grid',
  flexDirection: 'column',
  gap: '$3',
});



const TabListWrapper = styled('div', {
  display: 'grid',
  flexDirection: 'column',
  gap: '$3',
});