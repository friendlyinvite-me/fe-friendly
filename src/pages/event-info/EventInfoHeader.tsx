import React, { ReactNode, useMemo } from 'react';
import { styled } from '../../styles';
import { FriendlyEventData, NewEventResponseData } from '../../utils/types';
import moment from 'moment';
import { Button, Card, Text } from '../../components';
import { FlexWrapper } from '../../components/FlexWrapper';
import { Popover } from '../../components/Popover';

interface Props {
  event: FriendlyEventData;
  eventResponse: NewEventResponseData;
  isCreatedByUser: boolean;
  onDeleteEvent: () => Promise<void>;
}

export const EventInfoHeader: React.FC<Props> = (props: Props) => {
  const { event, isCreatedByUser, onDeleteEvent } = props;

  const userOptions: ReactNode[] = useMemo(() => {
    const options: ReactNode[] = [];
    options.push(
      <a>Share event link</a>,
    );
    if (isCreatedByUser) {
      options.push(
        <Button size='small' sentiment='secondary' onClick={onDeleteEvent}>Delete Event</Button>,
      );
    }
    return options;
  }, [isCreatedByUser]);

  console.log(userOptions);
  

  
  return (
    <EventInfoHeaderWrapper>
      <div>
        <Text typography='h1'>{event.name}</Text>
        
        <Text typography='h4'>
          {
            isCreatedByUser ? <span>You created this event</span> : <span>Created by {event?.user?.name}</span>
          }
          <span>{` ${moment(event.createdAt).fromNow()}`}</span>
        </Text>
      </div>
      <Popover activator={<EventOptionsActivator>Options</EventOptionsActivator>} items={userOptions} />

    </EventInfoHeaderWrapper>
  );
};

const EventInfoHeaderWrapper = styled('div', {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  width: '100%',
});

const EventOptionsActivator = styled('div', {
  border: '2px solid $contentPrimary',
  typography: 'p',
  cursor: 'pointer',
  fontWeight: 700,
  outline: 0,
  padding: '$1 $2',
  borderRadius: '20px',
  backgroundColor: 'transparent',
  color: '$contentPrimary',
});