import React, { useContext, useMemo, useState } from 'react';
import { UserContext } from '../../contexts/auth-context';
import { Navigate } from 'react-router-dom';
import { Text } from '../../components';
import { styled } from '../../styles';
import { Button } from '../../components';
import { NewEventData } from '../../utils/types';
import { createEvent } from '../../api';
import { EventNameStep } from './steps/EventNameStep';
import { DateTimeStep } from './steps/DateTimeStep';
import { Card } from '../../components';

export const  CreateAnEvent: React.FC = () => {
  const {user, isLoading} = useContext(UserContext); 
  
  const steps = [
    {
      title: 'Name of the event',
    },
    {
      title: 'Time of the event'
    },
    {
      title: 'Location of the event'
    },
    {
      title: 'Confirm your event details'
    },
    {
      title: 'Share with your friends'
    }
  ];


  const [stepIndex, setStepIndex] = useState(1);
  const [eventData, setEventData] = useState<NewEventData>({
    name: '',
    userId: user?.id ?? ''
  });

  const onPrev = () => {
    setStepIndex(stepIndex - 1);
  };

  const onNext = async () => {
    switch (stepIndex) {
      case 0: {
        // const event = await createEvent(eventData);
        // if (event) {
        setStepIndex(stepIndex+1);
        // }
        break;
      }
    }
  };

  const stepIsValid = useMemo(() => {
    switch (stepIndex) {
      case 0:
        return Boolean(eventData.name);
    }
  }, [stepIndex, eventData]);


  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }
  return (
    <Card>
      <NewEventFormWrapper>
        <NewEventFormHeader>
          <div>
            <Text color='$gray500' typography='p'>Step {stepIndex + 1} of {steps.length}</Text>
          </div>
          <div>
            <Text color='$contentPrimary' typography='h1'>{steps[stepIndex].title}</Text>
          </div>
          <ProgressBar>
            <ProgressBarFilled css={{
              width: `${(stepIndex + 1) * 100/(steps.length)}%`
            }}></ProgressBarFilled>
          </ProgressBar>
        </NewEventFormHeader>
        <NewEventFormBody>
          {
            stepIndex === 0 && (
              <EventNameStep eventData={eventData} onChangeName={(val) => {
                setEventData({
                  ...eventData,
                  name: val
                });
              }}/>
            )
          }
          {
            stepIndex === 1 && (
              <DateTimeStep />
            )
          }
        </NewEventFormBody>
        <NewEventFormControls>
          { stepIndex > 0 &&
            <Button size='large' onClick={onPrev} sentiment='secondary'>Prev</Button>
          }
          <Button size='large' disabled={!stepIsValid} onClick={onNext} sentiment='primary'>Next: date & time</Button>
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
  paddingBlock: '$7'
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
  gap: '$3'
});

const ProgressBar = styled('div', {
  borderRadius: '10px',
  height: '5px',
  maxWidth: '500px',
  width: '100%',
  backgroundColor: "$gray500",
  position: 'relative'
});

const ProgressBarFilled = styled('div', {
  height: '100%',
  width: 0,
  backgroundColor: '$yellow500',
  position: 'absolute',
  left: 0,
});