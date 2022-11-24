import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '../styles';
import { FriendlyEventRow } from '../utils/types';
import { Button } from './Button';
import { Text } from './Text';
import moment from 'moment';
  
interface Props {
  event: FriendlyEventRow;
}

export const EventCard: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const {event } = props;
  return (
    <EventCardWrapper>
      <Text typography='h3'>{event.name}</Text>
      <Text typography='p' color='$gray300'>Status: {event.status}</Text>
      <Text typography='p' color='$gray300'>Created: {moment(event.createdAt).format('ll')}</Text>
      <Button size='medium' onClick={() => navigate(`/events/${event.id}`)}>View</Button>
    </EventCardWrapper>
  );
};

const EventCardWrapper = styled('div', {
  padding: '$4',
  borderRadius: '10px',
  backgroundColor: "$gray100",
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});