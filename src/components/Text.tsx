import React, { ReactNode } from 'react';
import { styled, Typography, css } from '../styles';

interface Props {
  typography: Typography;
  color?: string;
  children: ReactNode;
}

export const Text: React.FC<Props> = (props: Props) => {
  return (
    <TextWrapper css={{
      color: props.color || '$contentPrimary',
    }} typography={props.typography}>{props.children}</TextWrapper>
  );
};

const TextWrapper = styled('div', {
  variants: {
    typography: {
      h0: { 
        typography: 'h0',
      },
      h1: { 
        typography: 'h1',
      },
      h2: {
        typography: 'h2',
      },
      h3: {
        typography: 'h3',
      },
      h4: {
        typography: 'h4',
      },
      p: {
        typography: 'p',
      },
    },
  },
});