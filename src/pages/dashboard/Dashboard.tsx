import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/auth-context'
import { Navigate} from 'react-router-dom';
import { Card } from '../../components/Card';
import { styled } from '../../styles';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import useAsyncEffect from 'use-async-effect';
import { fetchUserEvents } from '../../api';
import { FriendlyEventRow } from '../../utils/types';

export const Dashboard = () => {
  const {user, isLoading} = useContext(UserContext); 
  const [events, setEvents] = useState<FriendlyEventRow[]>([]);
  
  useAsyncEffect(async () => {
    if (user) {
      const events = await fetchUserEvents(user.id);
      if (events.length) {
        setEvents(events);
      }
      
    }
  }, [user]);
  if (!isLoading && !user) {
    return <Navigate to="/login" />
  }
  
  return (
    <>
      <DashboardHeader>
        <Tabs>
          <Tab sentiment='selected'>Home</Tab>
        </Tabs>
        <Button>Create a new event</Button>
      </DashboardHeader>
      <Card>
        <div>
          <div>your name is {user?.displayName}</div>
          <div>your events are</div>
          <div>
            <div>{events.map(e => {
              return (
                <div key={e.id}>
                  <div>{e.name}</div>
                  <a href={`/events/${e.id}`}>Open event page</a>
                </div>
              )
            })}</div>
          </div>
        </div>
      </Card>
    </>
  )
}

const DashboardHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$4',
  alignItems: 'center',
  justifyContent: 'space-between',
})


const Tabs = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$4',
  alignItems: 'center',
  justifyContent: 'start',
  marginBlock: '$6'
})


const Tab = styled('button', {
  display: 'inline-block',
  typography: 'h4',
  color: 'white',
  margin: 0,
  backgroundColor: 'transparent',
  padding: 0,
  border: 0,
  outline: 0,
  cursor: 'pointer',
  position: 'relative',

  '&:after': {
    top: 'calc(100% + 10px)',
    left: 0,
    width: '15px',
    height: '5px',
    borderRadius: '15px',
    backgroundColor: '$yellow500',
    content: '',
    position: 'absolute'
  },

  variants: {
    sentiment: {
      default: {
        fontWeight: 400,
        opacity: 0.5,
        
        '&:after': {
          backgroundColor: 'transparent'
        }
      },
      selected: {
        fontWeight: 700,

      }
    }
  }
})