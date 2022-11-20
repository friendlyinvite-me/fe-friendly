import React, { useState } from 'react';
import { DateTimePicker } from '../../../components/DateTimePicker';
import { styled } from '../../../styles';

interface DateTimeItem {
  value: Date;
}

export const DateTimeStep: React.FC = () => {
  const [dateTimes, setDateTimes] = useState<DateTimeItem[]>([
    {
      value: new Date()
    }
  ]);

  console.log(dateTimes);
  

  return (
    <DateTimeStepWrapper>
      {
        dateTimes.map((item, index) => (
          <DateTimeStepItemWrapper key={`${index}__${item.value.toString()}`} >
            <DateTimePicker value={item.value} onChange={(value) => {
              setDateTimes(dateTimes.map((item, i) => {
                if (index === i) {
                  return { value };
                }
                return item;
              }));
            }}/>
            <DeleteRow onClick={() => {
              const removed = dateTimes.filter((dateTime, i) => i !== index);
              setDateTimes(removed);
            }}>Delete</DeleteRow>
          </DateTimeStepItemWrapper>
        ))
      }
      <SuggestAnotherButton onClick={() => {
        setDateTimes([...dateTimes, {
          value: new Date()
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

const DateTimeStepItemWrapper = styled('div', {
  position: 'relative',
});

const DeleteRow = styled('div', {
  position: 'absolute',
  left: 'calc(100% + 25px)',
  top: 0,
  bottom: 0,
  marginTop: 'auto',
  marginBottom: 'auto',
  paddingBlock: '$5',
  color: '$gray300',
  cursor: 'pointer',
  textDecoration: 'underline'
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