import { ReactNode } from 'react'
import { styled } from '../styles';

interface Props { 
  children: ReactNode;
}

export const Card = (props: Props) => {
  return <CardWrapper>{props.children}</CardWrapper>
}

const CardWrapper = styled('div', {
  backgroundColor: 'white',
  borderRadius: '25px 25px 0 0',
  padding: '$5',
  flex: 1,
  display: 'flex'
})