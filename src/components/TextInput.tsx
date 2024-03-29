import React from 'react';
import { Size } from '.';
import { styled } from '../styles';

export interface Props {
  placeholder?: string;
  error?: string;
  onChange?: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: 'email' | 'text' | 'password' | 'number';
  value: string;
  size?: Size;
  readOnly?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

export const TextInput: React.FC<Props> = (props: Props) => {
  return (
    <StyledInput readOnly={props.readOnly} {...props} type={props.type ?? 'text'}  size={props.size} onChange={(e) => props.onChange?.(e.currentTarget.value)} />
  );
};

export const StyledInput = styled('input', {
  border: '1px solid $borderPrimary',
  color: '$contentPrimary',
  borderRadius: "10px",
  width: '100%',

  '&:focus': {
    border: '1px solid black',
    outline: 0,
  },

  variants: {
    size: {
      small: {
        typography: 'p',
        padding: '$2 $3',
      },
      medium :{
        typography: 'h4',
        padding: '$4 $6',
      },
      large: {
        typography: 'h3',
        padding: '$5 $7',
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});