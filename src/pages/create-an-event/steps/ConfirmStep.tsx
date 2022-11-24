import React from 'react';
import { Text } from '../../../components';
import { DateTimePicker } from '../../../components/DateTimePicker';
import { LocationCard } from '../../../components/LocationCard';
import { styled } from '../../../styles';
import { NewEventData } from '../../../utils/types';

interface Props {
  eventData: NewEventData;
}

export const ConfirmStep: React.FC<Props> = (props: Props) => {
  const { eventData } = props;
  return (
    <Wrapper>
      <Text typography='h3' color='$contentPrimary'>Event name</Text>
      <Text typography='h4' color='$contentPrimary'>{eventData.name}</Text>
      <br />
      <Text typography='h3' color='$contentPrimary'>Date & Time Suggestions</Text>
      {
        eventData.dateTimes.map((dateTime, index) => (
          <DateTimePicker
            key={index}
            disabled
            value={{
              id: dateTime.id,
              value: new Date(dateTime.value),
            }}
          />
        ))
      }
      <br />
      <Text typography='h3' color='$contentPrimary'>Location Suggestions</Text>
      {
        eventData.locations.map((location, index) => (
          <LocationCard key={index} location={location.value} />
        ))
      }
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  alignItems: 'start',
  width: '400px',
});