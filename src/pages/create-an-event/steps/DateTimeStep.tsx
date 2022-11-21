import React, { useState } from 'react';
import { DateTimePicker } from '../../../components/DateTimePicker';
import { styled } from '../../../styles';
import moment from 'moment';


interface Props {
  dateTimes: Date[],
  onSetDateTimes: (arr: Date[]) => void;
}

export const DateTimeStep: React.FC<Props> = (props: Props) => {
  const { dateTimes, onSetDateTimes } = props;

  console.log(dateTimes);

  return (
    <DateTimeStepWrapper>
      {
        dateTimes.map((item, index) => (
          <DateTimeStepItemWrapper key={`${index}__${item.toString()}`} >
            <DateTimePicker
              size='large'
              value={item}
              onChange={(value) => {
                onSetDateTimes(dateTimes.map((item, i) => {
                  if (index === i) {
                    return value;
                  }
                  return item;
                }));
              }}
            />
            { index > 0 && 
              <DeleteRow onClick={() => {
                const removed = dateTimes.filter((dateTime, i) => i !== index);
                onSetDateTimes(removed);
              }}>Delete</DeleteRow>
            }
          </DateTimeStepItemWrapper>
        ))
      }
      <SuggestAnotherButton onClick={() => {
        onSetDateTimes([...dateTimes, moment(dateTimes[dateTimes.length - 1]).add(1, 'd').toDate()]);
      }}>Suggest another</SuggestAnotherButton>
    </DateTimeStepWrapper>
  );
};

const DateTimeStepWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  alignItems: 'center',
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
  height: '20px',
  color: '$gray300',
  cursor: 'pointer',
  textDecoration: 'underline',

  '&:hover': {
    'color': "$contentPrimary",
  },
});

const SuggestAnotherButton = styled('button', {
  outline: 0,
  border: 0,
  typography: 'h4',
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'underline',
  backgroundColor: 'transparent',
  paddingBlock: '$3',
});