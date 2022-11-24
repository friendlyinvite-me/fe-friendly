import React, { ReactNode } from 'react';
import { styled } from '../styles';
import { Text } from './Text';

interface Props {
  title: string;
  desc?: string;
  action?: ReactNode;
}

export const EmptyState: React.FC<Props> = (props: Props) => {
  return (
    <EmptyStateWrapper>
      <img src='./empty-state.png' width={250} height="auto" />
      <Text typography='h4'>{props.title}</Text>
      {
        props.action
      }
    </EmptyStateWrapper>
  );
};

const EmptyStateWrapper = styled('div', {
  display: 'flex',
  width: '100%',
  paddingBlock: '$10',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$5',
});