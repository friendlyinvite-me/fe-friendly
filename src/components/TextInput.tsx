import React from 'react';
import { styled } from '../styles';

interface Props {
  placeholder: string;
  error?: string;
  onChange: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
}

export const TextInput: React.FC<Props> = (props: Props) => {
  return (
    <StyledInput {...props} onChange={(e) => props.onChange(e.currentTarget.value)} />
  );
};

const StyledInput = styled('input', {
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
});