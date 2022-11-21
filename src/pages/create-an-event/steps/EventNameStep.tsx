import React from 'react';
import { TextInput, } from '../../../components';
import { NewEventData, } from '../../../utils/types';

interface Props {
  onChangeName: (val: string) => void;
  eventData: NewEventData;
}

export const EventNameStep: React.FC<Props> = (props: Props,) => {
  return (
    <TextInput placeholder='Name of the event' onChange={props.onChangeName} value={props.eventData.name}/>
  );
};