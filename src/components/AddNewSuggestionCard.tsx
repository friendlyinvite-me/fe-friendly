import React from 'react';
import { styled } from '../styles';
import { ProposalType } from '../utils/types';
import { Text } from './Text';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface Props {
  onClick: () => void;
  type: ProposalType;
}

export const AddNewSuggestionCard: React.FC<Props> = (props: Props) => {
  return (
    <RowWrapper onClick={props.onClick}>
      <FontAwesomeIcon icon={faPlus} />
      <Text typography='h4'>Suggest new {props.type === 'datetime' ? 'Date & Time' : "Location"}</Text>
    </RowWrapper>
  );
};

const RowWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '$2',
  padding: '$4',
  border: '1px dashed $borderPrimary',
  borderRadius: '10px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: "$gray100",
  },
});