import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { styled } from '../styles';

interface Props {
  value: string | undefined;
  onChange: (val: string | undefined) => void;
}

export const DateTimePicker: React.FC<Props> = (props: Props) => {
  const [valueDate, onChangeDate] = useState<Date | null>(new Date());
  const [valueTime, onChangeTime] = useState<string | Date>('10:00');
  return (
    <DateTimePickerWrapper>
      <DatePicker disableCalendar onChange={onChangeDate} value={valueDate} />
      <TimePicker onChange={onChangeTime} value={valueTime} />
    </DateTimePickerWrapper>
  );
};

const DateTimePickerWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$3',
  alignItems: 'center',

  '& > *': {
    flex: 1
  }
});