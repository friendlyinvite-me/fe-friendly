import React, { useEffect, useState } from 'react';
import DateTimePickerInput from 'react-datetime-picker';
import { styled } from '../styles';

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
      <DateTimePickerInput clearIcon={null} disableClock disableCalendar onChange={(val) => {
        onChange(val);
      }} value={value} />
    </DateTimePickerWrapper>
  );
};

const DateTimePickerWrapper = styled('div', {
  padding: '$4 $6',
  border: '1px solid $gray200',
  color: '$contentPrimary',
  borderRadius: "10px",
  width: '300px',
  typography: 'h4',

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