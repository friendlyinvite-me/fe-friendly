import moment from 'moment';
import React from 'react';
import { styled } from '../styles';
import { FriendlyEventResponse } from '../utils/types';
import { Text } from './Text';

interface Props {
  response: FriendlyEventResponse;
}

export const EventResponseCard: React.FC<Props> = (props: Props) => {
  const { response } = props;
  return (
    <EventResponseCardWrapper>
      <Text typography='h3'>{response.user?.name}</Text>
      <div>{moment(response.createdAt).fromNow()}</div>
      <div>{response.comments}</div>
      <div>did the following actions</div>
      <div>
        {
          response.actions.map((action, j) => {
            return (
              <div key={j}>
                <div>type: {action.type}</div>
                <div>value: {typeof action.value === 'object' ? action.value.name : action.value}</div>
              </div>
            );
          })
        }
      </div>
    </EventResponseCardWrapper>
  );
};

const EventResponseCardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  border: '1px solid $borderPrimary',
  borderRadius: '10px',
  padding: '$3',
});