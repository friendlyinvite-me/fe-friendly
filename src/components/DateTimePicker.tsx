import React, { useEffect, useState } from 'react';
import DateTimePickerInput from 'react-datetime-picker';
import { styled } from '../styles';
import moment from 'moment';
import { Text } from './Text';
import { Size } from '.';

interface Props {
  value: Date;
  onChange: (val: Date) => void;
  size?: Size;
}

export const DateTimePicker: React.FC<Props> = (props: Props) => {
  const [value, onChange] = useState<Date>(props.value); 

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <DateTimePickerWrapper size={props.size}>
      <DateTimePickerInput format='dd MMM y   h:mm a' clearIcon={null} disableClock disableCalendar onChange={(val) => {
        onChange(val);
      }} value={value} />
      <Text typography='p' color="$gray300">{moment(value).format('dddd')} ({moment(value).fromNow()})</Text>
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
  gap: '$2',

  variants: {
    size: {
      small: {
        typography: 'p',
        padding: '$2 $3',
      },
      medium :{
        typography: 'h4',
        padding: '$4 $6',
      },
      large: {
        typography: 'h3',
        padding: '$5 $7',

        '.react-datetime-picker__inputGroup__input': {
          '&.react-datetime-picker__inputGroup__day': {
            width: '28px !important',
          },
          '&.react-datetime-picker__inputGroup__year': {
            width: '56px !important',
          },
          '&.react-datetime-picker__inputGroup__hour': {
            width: '24px !important',
          },
          '&.react-datetime-picker__inputGroup__minute': {
            width: '24px !important',
          },
        },
      },
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

    '.react-datetime-picker__wrapper' : {
      border: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
});