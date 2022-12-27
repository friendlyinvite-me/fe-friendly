import React from 'react';
import { styled } from '../../styles';
import { FriendlyEventData, NewEventResponseData } from '../../utils/types';
import moment from 'moment';
import { Button, Card, Text } from '../../components';
import { FlexWrapper } from '../../components/FlexWrapper';

interface Props {
  event: FriendlyEventData;
  eventResponse: NewEventResponseData;
  isCreatedByUser: boolean;
  onDeleteEvent: () => Promise<void>;
  onSubmitEventResponse: () => void;
}

export const EventInfoHeader: React.FC<Props> = (props: Props) => {
  const { event, isCreatedByUser, onDeleteEvent, eventResponse, onSubmitEventResponse } = props;
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
      <FlexWrapper>
        { isCreatedByUser &&
              <Button sentiment='secondary' onClick={onDeleteEvent}>Delete Event</Button>
        }
        <Button disabled={eventResponse.actions.length === 0} onClick={onSubmitEventResponse}>Submit</Button>
      </FlexWrapper>
    </EventInfoHeaderWrapper>
  );
};

const EventInfoHeaderWrapper = styled('div', {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  width: '100%',
});