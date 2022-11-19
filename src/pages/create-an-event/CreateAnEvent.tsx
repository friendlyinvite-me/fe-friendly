import { useContext, useMemo, useState } from 'react';
import { Card } from '../../components/Card'
import { UserContext } from '../../contexts/auth-context';
import { Navigate } from 'react-router-dom';
import { Text } from '../../components/Text';
import { styled } from '../../styles';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';

export const  CreateAnEvent = () => {
  const {user, isLoading} = useContext(UserContext); 
  
  const steps = [
    {
      title: 'Name of the event',
    },
    {
      title: 'Time of the event'
    }
  ]

  interface NewEventData {
    name: string;
  }

  const [stepIndex, setStepIndex] = useState(0);
  const [eventData, setEventData] = useState<NewEventData>({
    name: ''
  })

  const onPrev = () => {
    // 
  }

  const onNext = () => {
    // 
  }

  const stepIsValid = useMemo(() => {
    switch (stepIndex) {
      case 0:
      default:
        return Boolean(eventData.name);
    }
  }, [stepIndex, eventData]);


  if (!isLoading && !user) {
    return <Navigate to="/login" />
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
              <TextInput placeholder='Name of the event' onChange={(val) => {
                setEventData({
                  ...eventData,
                  name: val
                })
              }} value={eventData.name}/>
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
  )
}

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
})

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