import React, { useEffect, useState } from 'react';
import DateTimePickerInput from 'react-datetime-picker';
import { styled } from '../styles';
import moment from 'moment';
import { Text } from './Text';

interface Props {
  value: Date;
  onChange?: (val: Date) => void;
  disabled?: boolean;
}

export const DateTimePicker: React.FC<Props> = (props: Props) => {
  const [value, onChange] = useState<Date>(props.value); 

  useEffect(() => {
    props.onChange && props.onChange(value);
  }, [value]);

  return (
    <DateTimePickerWrapper >
      <DateTimePickerInput disabled={props.disabled} format='dd MMM y   h:mm a' clearIcon={null} disableClock disableCalendar onChange={(val) => {
        onChange(val);
      }} value={value} />
      <Text typography='h4' color="$gray300">{moment(value).format('dddd')} ({moment(value).fromNow()})</Text>
    </DateTimePickerWrapper>
  );
};

const DateTimePickerWrapper = styled('div', {
  border: '1px solid $gray200',
  color: '$contentPrimary',
  borderRadius: "10px",
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
  typography: 'h3',
  padding: '$4',

  '.react-datetime-picker__inputGroup__input': {
    '&.react-datetime-picker__inputGroup__day': {
      width: '28px !important',
    },
    '&.react-datetime-picker__inputGroup__year': {
      width: '60px !important',
    },
    '&.react-datetime-picker__inputGroup__hour': {
      width: '30px !important',
    },
    '&.react-datetime-picker__inputGroup__minute': {
      width: '30px !important',
    },
  },

  defaultVariants: {
    size: 'medium',
  },

  '&:focus': {
    border: '1px solid black',
    outline: 0,
  },

  '.react-datetime-picker': {
    width: '100%',
    color: '$contentPrimary',

    '.react-datetime-picker__wrapper' : {
      border: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  '.react-datetime-picker__inputGroup': {
    backgroundColor: 'white !important',

    
  },

  'select, input': {
    appearance: 'none',
    color: "$contentPrimary",
    opacity: 1,
  },
});