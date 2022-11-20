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
  )
}

const StyledInput = styled('input', {
  padding: '$4 $6',
  border: '2px solid $gray500',
  color: '$contentPrimary',
  borderRadius: "5px",
  width: '300px',
  typography: 'h4',

  '&:focus': {
    border: '2px solid black',
    outline: 0
  }
})