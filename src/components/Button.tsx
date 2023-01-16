import React, { ReactNode } from 'react';
import { styled } from '../styles';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  sentiment?: 'primary' | 'secondary' | 'primary-inverted';
  disabled?: boolean;
  size?: 'small' |'medium' | 'large'
}

export const Button: React.FC<Props> = (props: Props) => {
  return (
    <ButtonWrapper size={props.size ?? 'medium'} disabled={props.disabled ?? false} sentiment={props.sentiment} onClick={props.onClick}>
      <ButtonContentWrapper>{props.children}</ButtonContentWrapper>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled('button', {
  display: 'block',
  color: '$contentPrimary',
  backgroundColor: '$yellow500',
  border: 0,
  outline: 0,
  cursor: 'pointer',
  borderRadius: '70px',
  transition: '0.25s ease',

  '&:disabled': {
    backgroundColor: '$gray200 !important',
    cursor: 'not-allowed !important',
  },

  variants: {
    sentiment: {
      primary: {
        color: '$contentPrimary',
        backgroundColor: '$yellow500',

        '&:hover': {
          backgroundColor: '$yellow600',
        },
      },
      secondary: {
        color: '$contentPrimary',
        backgroundColor: '$gray100',
        '&:hover': {
          backgroundColor: '$gray200',
        },
      },
      'primary-inverted': {
        color: '$yellow500',
        backgroundColor: 'black',
      },
    },

    size: {
      small: {
        fontSize: '14px',
        fontWeight: '500',
        paddingBlock: '$2',
        paddingInline: '$3',
      },

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
        paddingInline: '$3',
      },
    },
  },
  defaultVariants: {
    sentiment: 'primary',
    size: 'medium',
  },
});

const ButtonContentWrapper = styled('span', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: "$2",
});