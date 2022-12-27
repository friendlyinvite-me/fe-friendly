import React, { useMemo } from 'react';
import { DateTimePicker } from '../../../components/DateTimePicker';
import { styled } from '../../../styles';
import moment from 'moment';
import { DeleteRow, SuggestAnotherButton } from './shared';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  dateTimes: {id: string; value: Date}[],
  onSetDateTimes: (arr: {id: string; value: Date}[]) => void;
}

export const DateTimeStep: React.FC<Props> = (props: Props) => {
  const { dateTimes, onSetDateTimes } = props;

  const newDateSuggested = useMemo(() => {
    if (!dateTimes.length) {
      return moment().add(2, 'hours').set('minute', 0).toDate();
    }
    return moment(dateTimes[dateTimes.length - 1].value).add(1, 'd').toDate();
  }, [dateTimes]);

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
            <DeleteRow onClick={() => {
              const removed = dateTimes.filter((dateTime) => dateTime.id !== item.id);
              onSetDateTimes(removed);
            }}>Delete</DeleteRow>
          </DateTimeStepItemWrapper>
        ))
      }
      <SuggestAnotherButton onClick={() => {
        onSetDateTimes([...dateTimes, {
          id: uuidv4(),
          value: newDateSuggested,
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

