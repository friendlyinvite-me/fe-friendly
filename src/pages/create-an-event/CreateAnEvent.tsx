import { useContext, useState } from 'react';
import { Card } from '../../components/Card'
import { UserContext } from '../../contexts/auth-context';
import { Navigate } from 'react-router-dom';
import { Text } from '../../components/Text';
import { styled } from '../../styles';

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

  const [stepIndex, setStepIndex] = useState(0);

  if (!isLoading && !user) {
    return <Navigate to="/login" />
  }


  return (
    <Card>
      <NewEventFormWrapper>
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
})