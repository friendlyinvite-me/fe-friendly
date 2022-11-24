import React, { ReactNode } from 'react';
import { styled } from '../styles';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  sentiment?: 'primary' | 'secondary';
  disabled?: boolean;
  size?: 'medium' | 'large'
}

export const Button: React.FC<Props> = (props: Props) => {
  return <ButtonWrapper size={props.size ?? 'medium'} disabled={props.disabled ?? false} sentiment={props.sentiment} onClick={props.onClick}>{props.children}</ButtonWrapper>;
};

const ButtonWrapper = styled('button', {
  display: 'block',
  color: '$contentPrimary',
  backgroundColor: '$yellow500',
  border: 0,
  outline: 0,
  cursor: 'pointer',
  borderRadius: '70px',

  '&:disabled': {
    backgroundColor: '$gray500 !important',
    cursor: 'not-allowed !important',
  },

  variants: {
    sentiment: {
      primary: {
        color: '$contentPrimary',
        backgroundColor: '$yellow500',
      },
      secondary: {
        color: '$contentPrimary',
        backgroundColor: '$gray100',
      },
    },

    size: {
      medium: {
        fontSize: '14px',
        fontWeight: '700',
        paddingBlock: '$3',
        paddingInline: '$5',
      },
      large: {
        fontSize: '16px',
        fontWeight: '700',
        paddingBlock: '$5',
        paddingInline: '$7',
      },
    },
  },
  defaultVariants: {
    sentiment: 'primary',
    size: 'medium',
  },
});