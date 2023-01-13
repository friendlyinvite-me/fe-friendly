import React from 'react';
import { EventResponseCard } from '../../../components/EventResponseCard';
import { FriendlyEventData, FriendlyEventResponse } from '../../../utils/types';

interface Props {
  event: FriendlyEventData;
}

export const EventHistory: React.FC<Props> = ({event}: Props) => {
  return (
    <>
      {
        ((event?.responses) as FriendlyEventResponse[] ?? []).sort((a,b) => {
          return (
            new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
          );
        } ).map((response) => (
          <EventResponseCard response={response} key={response.id} />
        ))
      }
    </>
  );
};