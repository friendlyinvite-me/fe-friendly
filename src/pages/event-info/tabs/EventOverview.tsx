import React from 'react';
import { FriendlyEventData } from '../../../utils/types';

interface Props {
  event: FriendlyEventData;
}

export const EventOverview: React.FC<Props> = ({event}: Props) => {
  return (
    <div>{event.name}</div>
  );
};