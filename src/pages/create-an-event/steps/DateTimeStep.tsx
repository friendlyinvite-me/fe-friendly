import React, { useState } from 'react';
import { DateTimePicker } from '../../../components/DateTimePicker';
import { styled } from '../../../styles';

interface DateTimeItem {
  value: string | undefined;
}

export const DateTimeStep: React.FC = () => {
  const [dateTimes, setDateTimes] = useState<DateTimeItem[]>([{value: undefined}]);
  return (
    <DateTimeStepWrapper>
      {
        dateTimes.map((item, index) => (
          <DateTimePicker value={item.value} onChange={(value) => {
            setDateTimes(dateTimes.map((item, i) => {
              if (index === i) {
                return { value };
              }
              return item;
            }));
          }} key={index} />
        ))
      }
      <SuggestAnotherButton onClick={() => {
        setDateTimes([...dateTimes, {
          value: undefined
        }]);
      }}>Suggest another</SuggestAnotherButton>
    </DateTimeStepWrapper>
  );
};

const DateTimeStepWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  alignItems: 'center'
});

const SuggestAnotherButton = styled('button', {
  outline: 0,
  border: 0,
  typography: 'h4',
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'underline',
  backgroundColor: 'transparent'
});