import React from 'react';
import { DateTimePicker } from '../../../components/DateTimePicker';
import { styled } from '../../../styles';
import moment from 'moment';
import { DeleteRow, SuggestAnotherButton } from './shared';


interface Props {
  dateTimes: Date[],
  onSetDateTimes: (arr: Date[]) => void;
}

export const DateTimeStep: React.FC<Props> = (props: Props) => {
  const { dateTimes, onSetDateTimes } = props;

  return (
    <Wrapper>
      {
        dateTimes.map((item, index) => (
          <DateTimeStepItemWrapper key={`${index}__${item.toString()}`}>
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
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  alignItems: 'center',
});

const DateTimeStepItemWrapper = styled('div', {
  position: 'relative',
});
