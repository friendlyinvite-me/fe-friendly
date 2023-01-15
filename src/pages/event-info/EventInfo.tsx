import React, { useContext, useMemo, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button, Card, Text } from '../../components';
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
  const [tab, setTab] = useState<'overview' | 'datetime' | 'location' | 'history'>('overview');
  
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
    onCreateEventResponse({...eventResponse, userId: user!.id})
      .then(() => {
        toast.success('Thank you for your submission. Your response will be sent to everyone else!');
        window.location.reload();
      })
      .catch((err: any) => {
        toast.error(err.response.data ?? 'Something went wrong.');
      });
  };

  const addNewProposal = (type: ProposalType) => {
    setAddingNewProposal(type);
  };

  const submitCopy = useMemo(() => {
    if (!user) {
      return "Log in to collaborate and add your suggestions";
    }

    const hasSuggestions = eventResponse.actions.some(a => a.type === 'datetime' || a.type === 'location');
    const hasVotes = eventResponse.actions.some(a => a.type === 'upvote' || a.type === 'downvote'  || a.type === 'undovote');

    if (hasSuggestions && hasVotes) {
      return "Submit your suggestions & votes";
    }
    if (hasSuggestions) {
      return "Submit your suggestions";
    }

    if (hasVotes) {
      return "Submit your votes";
    }

    if (tab === 'datetime') {
      return "Vote on existing dates or make new suggestions";
    }

    if (tab === 'location') {
      return "Vote on existing locations or make new suggestions";
    }

    return "Start collaborating by voting or making new suggestions";
  }, [eventResponse]);

  const isEventReadyForSubmit = useMemo(() => {
    return eventResponse.actions.length > 0;
  }, [eventResponse.actions.length]);

  const ctaAction = () => {
    if (!user) {
      navigate(`/login?redirectTo=${window.location.href}`);
      return;
    }

    if (eventResponse.actions.length === 0) {
      if (tab === 'overview' || tab === 'history') {
        setTab('datetime');
        return;
      }

      if (tab === 'datetime' || tab === 'location') {
        toast.error('You have not made any suggestions or votes yet.');
        return;
      }
    }
    
    

    submitEventResponse();
  };

  if (isLoading) {
    return (
      <Card>
        <LoadingSpinner  title="Loading event information..." />
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
          <Tab sentiment={tab === 'overview' ? 'selected' : 'default'} onClick={() => setTab('overview')}>Overview</Tab>
          <Tab sentiment={tab === 'datetime' ? 'selected' : 'default'} onClick={() => setTab('datetime')}>Date & Times ({dateTimeSuggestions.length})</Tab>
          <Tab sentiment={tab === 'location' ? 'selected' : 'default'} onClick={() => setTab('location')}>Locations ({locationSuggestions.length})</Tab>
          <Tab sentiment={tab === 'history' ? 'selected' : 'default'} onClick={() => setTab('history')}>History ({event.responses.length})</Tab>
        </Tabs>
        {
          tab === 'overview' && (
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
        
        <FloatingButtonWrapper>
          <Button sentiment={isEventReadyForSubmit ? 'primary' : 'primary-inverted'} size='large' onClick={ctaAction}>{ submitCopy }</Button>
        </FloatingButtonWrapper>

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
                  <AddNewProposalModalWrapper>
                    <Text typography='h3'>Pick times you would like to suggest</Text>
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
                  </AddNewProposalModalWrapper>
                )
              }
              {
                addingNewProposal === 'location' && (
                  <AddNewProposalModalWrapper>
                    <Text typography='h3'>Pick locations you would like to suggest</Text>
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
                  </AddNewProposalModalWrapper>
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
  paddingBottom: '70px',
});



const TabListWrapper = styled('div', {
  display: 'grid',
  flexDirection: 'column',
  gap: '$3',
});

const FloatingButtonWrapper = styled('div', {
  position: 'fixed',
  bottom: 0,
  margin: 'auto',
  width: '100%',
  left: 0,
  padding: "$3",

  '& > button' : {
    width: '100%',
  },
});

const AddNewProposalModalWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  textAlign: 'center',
});