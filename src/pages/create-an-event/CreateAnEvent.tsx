import React, { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../contexts/auth-context';
import { Navigate, useNavigate } from 'react-router-dom';
import { Text } from '../../components';
import { styled } from '../../styles';
import { Button } from '../../components';
import { FriendlyEventData, NewEventData } from '../../utils/types';
import { EventNameStep } from './steps/EventNameStep';
import { DateTimeStep } from './steps/DateTimeStep';
import { Card } from '../../components';
import moment from 'moment';
import { LocationStep } from './steps/LocationStep';
import { ConfirmStep } from './steps/ConfirmStep';
import { createEvent } from '../../api';
import { ShareStep } from './steps/ShareStep';
import toast from 'react-hot-toast';

export const  CreateAnEvent: React.FC = () => {
  const {user, isLoading} = useContext(UserContext);
  const [stepIndex, setStepIndex] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [eventData, setEventData] = useState<NewEventData>({
    name: '',
    userId: user?.id ?? '',
    dateTimes: [{
      id: 0,
      value: moment().add(2, 'hours').set('minute', 0).toString(),
    }],
    locations: [],
  });
  const navigate = useNavigate();

  const [newlyCreatedEvent, setNewlyCreatedEvent] = useState<FriendlyEventData | null>(null);

  const steps = [
    {
      title: 'Name of the event',
      buttons: {
        next: 'Next: Time of the event',
        prev: 'Cancel',
      },
      isDisabled: () => !eventData.name,
      content: (
        <EventNameStep eventData={eventData} onChangeName={(val) => {
          setEventData({
            ...eventData,
            name: val,
          });
        }}/>
      ),
    },
    {
      title: 'Time of the event',
      buttons: {
        next: "Next: Location of the event",
        prev: "Back",
      },
      isValid: () => true,
      content: (
        <DateTimeStep
          dateTimes={eventData.dateTimes.map(d => ({
            ...d,
            value: new Date(d.value),
          }))} 
          onSetDateTimes={(dateTimes) => {
            setEventData({
              ...eventData,
              dateTimes: dateTimes.map(d => ({
                id: d.id,
                value: d.value.toString(),
              })),
            });
          }} />
      ),
    },
    {
      title: 'Location of the event',
      buttons: {
        next: "Next: Confirm event details",
        prev: "Back",
      },
      isValid: () => true,
      content: (
        <LocationStep
          locations={eventData.locations}
          onSetLocations={(locations) => {
            setEventData({
              ...eventData,
              locations,
            });
          }} />
      ),
    },
    {
      title: 'Confirm your event details',
      buttons: {
        next: "Create my event",
        prev: "Back",
      },
      isValid: () => true,
      content: (
        <ConfirmStep eventData={eventData} />
      ),
      onNext: async () => {
        setIsBusy(true);
        const event = await createEvent({...eventData, userId: user?.id ?? ''});
        if (event) {
          setNewlyCreatedEvent(event);
        }
        setIsBusy(false);
        toast.success('Congrats! Your event has been created successfully.');
      },
    },
    {
      title: 'Share with your friends',
      buttons: {
        next: "View event page",
      },
      isValid: () => true,
      content: (
        newlyCreatedEvent ? <ShareStep eventInfo={newlyCreatedEvent}/> : <div>Something went wrong</div>
      ),
      onNext: async () => {
        window.open(`/events/${newlyCreatedEvent?.id}`);
      },
      onClose: async () => {
        navigate('/dashboard');
      },
    },
  ];


  

  const onPrev = () => {
    setStepIndex(stepIndex - 1);
  };

  const onNext = async () => {
    currentStep.onNext && await currentStep.onNext();
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex+1);
    }
  };
  
  const currentStep = steps[stepIndex];

  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }
  return (
    <Card>
      <NewEventFormWrapper>
        <NewEventFormHeader>
          <div>
            <Text color='$gray300' typography='p'>Step {stepIndex + 1} of {steps.length}</Text>
          </div>
          <div>
            <Text color='$contentPrimary' typography='h1'>{currentStep.title}</Text>
          </div>
          <ProgressBar>
            <ProgressBarFilled css={{
              width: `${(stepIndex + 1) * 100/(steps.length)}%`,
            }}></ProgressBarFilled>
          </ProgressBar>
        </NewEventFormHeader>

        <NewEventFormBody>
          {currentStep.content}
        </NewEventFormBody>

        <NewEventFormControls>
          { stepIndex > 0 && currentStep.buttons.prev &&
            <Button disabled={isBusy} size='large' onClick={onPrev} sentiment='secondary'>{currentStep.buttons.prev}</Button>
          }
          { currentStep.onClose &&
            <Button disabled={isBusy} size='large' onClick={currentStep.onClose} sentiment='secondary'>Close</Button>
          }
          <Button
            size='large'
            disabled={isBusy || currentStep.isDisabled?.()}
            onClick={onNext}
            sentiment='primary'>
            {currentStep.buttons.next}
          </Button>
        </NewEventFormControls>
      </NewEventFormWrapper>
    </Card>
  );
};

const NewEventFormWrapper = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '$7',
  alignItems: 'center',
  paddingInline: '$3',
  paddingBlock: '$7',
});

const NewEventFormHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$7',
  alignItems: 'center',
});

const NewEventFormBody = styled('div', {
  flex: 1,
  width: '100%',
  maxWidth: '450px',
});

const NewEventFormControls = styled('div', {
  padding: '$3',
  width: '100%',
  display: 'flex',
  gap: '$3',
  flexDirection: 'column-reverse',
  alignItems: 'stretch',


  '@md': {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }, 
});

const ProgressBar = styled('div', {
  borderRadius: '10px',
  height: '5px',
  maxWidth: '500px',
  width: '100%',
  backgroundColor: "#F6F6F6",
  position: 'relative',
  overflow: 'hidden',
});

const ProgressBarFilled = styled('div', {
  height: '100%',
  width: 0,
  backgroundColor: '$yellow500',
  position: 'absolute',
  left: 0,
});