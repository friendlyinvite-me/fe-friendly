import React, { useEffect, useState } from 'react';
import DateTimePickerInput from 'react-datetime-picker';
import { styled } from '../styles';
import moment from 'moment';
import { Text } from './Text';

interface Props {
  value: Date;
  onChange: (val: Date) => void;
}

export const DateTimePicker: React.FC<Props> = (props: Props) => {
  const [value, onChange] = useState<Date>(props.value); 

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <DateTimePickerWrapper>
      <DateTimePickerInput format='dd MMM y   h:mm a' clearIcon={null} disableClock disableCalendar onChange={(val) => {
        onChange(val);
      }} value={value} />
      <Text typography='p' color="$gray300">{moment(value).format('dddd')} ({moment(value).fromNow()})</Text>
    </DateTimePickerWrapper>
  );
};

const DateTimePickerWrapper = styled('div', {
  padding: '$4 $6',
  border: '1px solid $gray200',
  color: '$contentPrimary',
  borderRadius: "10px",
  width: '400px',
  typography: 'h4',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  '&:focus': {
    border: '1px solid black',
    outline: 0,
  },

  '.react-datetime-picker': {
    width: '100%',

    '.react-datetime-picker__wrapper' : {
      border: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

 
});