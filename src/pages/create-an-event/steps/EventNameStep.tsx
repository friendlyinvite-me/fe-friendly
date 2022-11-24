import React from 'react';
import { TextInput } from '../../../components';
import { styled } from '../../../styles';
import { NewEventData } from '../../../utils/types';

interface Props {
  onChangeName: (val: string) => void;
  eventData: NewEventData;
}

export const EventNameStep: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper>
      <TextInput size='large' placeholder='Name of the event' onChange={props.onChangeName} value={props.eventData.name}/>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  alignItems: 'center',
  width: '100%',
});