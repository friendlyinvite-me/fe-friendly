import React from 'react';
import { DateTimePicker } from '../../../components/DateTimePicker';
import { styled } from '../../../styles';
import moment from 'moment';
import { DeleteRow, SuggestAnotherButton } from './shared';


interface Props {
  dateTimes: {id: number; value: Date}[],
  onSetDateTimes: (arr: {id: number; value: Date}[]) => void;
}

export const DateTimeStep: React.FC<Props> = (props: Props) => {
  const { dateTimes, onSetDateTimes } = props;

  return (
    <Wrapper>
      {
        dateTimes.map((item, index) => (
          <DateTimeStepItemWrapper key={item.id}>
            <DateTimePicker
              value={item}
              onChange={(value) => {
                onSetDateTimes(dateTimes.map((item) => {
                  if (item.id === value.id) {
                    return value;
                  }
                  return item;
                }));
              }}
            />
            { index > 0 && 
              <DeleteRow onClick={() => {
                const removed = dateTimes.filter((dateTime) => dateTime.id !== item.id);
                onSetDateTimes(removed);
              }}>Delete</DeleteRow>
            }
          </DateTimeStepItemWrapper>
        ))
      }
      <SuggestAnotherButton onClick={() => {
        onSetDateTimes([...dateTimes, {
          id: dateTimes[dateTimes.length - 1].id + 1,
          value: moment(dateTimes[dateTimes.length - 1].value).add(1, 'd').toDate(),
        }]);
      }}>Suggest another</SuggestAnotherButton>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  alignItems: 'center',
  width: '100%',
});

const DateTimeStepItemWrapper = styled('div', {
  position: 'relative',
});

