import React, { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../contexts/auth-context';
import { Navigate } from 'react-router-dom';
import { Text } from '../../components';
import { styled } from '../../styles';
import { Button } from '../../components';
import { NewEventData } from '../../utils/types';
import { EventNameStep } from './steps/EventNameStep';
import { DateTimeStep } from './steps/DateTimeStep';
import { Card } from '../../components';
import moment from 'moment';
import { LocationStep } from './steps/LocationStep';
import { ConfirmStep } from './steps/ConfirmStep';
import { createEvent } from '../../api';

export const  CreateAnEvent: React.FC = () => {
  const {user, isLoading} = useContext(UserContext);
  const [stepIndex, setStepIndex] = useState(0);
  const [eventData, setEventData] = useState<NewEventData>({
    name: '',
    userId: user?.id ?? '',
    dateTimes: [{
      id: 0,
      value: moment().add(1, 'week').toString(),
    }],
    locations: [],
  });

  console.log(eventData);
  
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
        await createEvent({...eventData, userId: user?.id ?? ''});
      },
    },
    {
      title: 'Share with your friends',
      buttons: {
        next: "Close",
        prev: "Back",
      },
    },
  ];


  

  const onPrev = () => {
    setStepIndex(stepIndex - 1);
  };

  const onNext = async () => {
    currentStep.onNext && await currentStep.onNext();
    setStepIndex(stepIndex+1);
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
          { stepIndex > 0 &&
            <Button size='large' onClick={onPrev} sentiment='secondary'>{currentStep.buttons.prev}</Button>
          }
          <Button size='large' disabled={currentStep.isDisabled && currentStep.isDisabled()} onClick={onNext} sentiment='primary'>{currentStep.buttons.next}</Button>
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
});

const NewEventFormControls = styled('div', {
  padding: '$3',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$3',
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