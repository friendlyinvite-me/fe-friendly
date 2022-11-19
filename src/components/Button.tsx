import { ReactNode } from 'react'
import { styled } from '../styles';

interface Props {
  children: ReactNode;
  onClick: () => any;
}

export const Button = (props: Props) => {
  return <ButtonWrapper onClick={props.onClick}>{props.children}</ButtonWrapper>
}

const ButtonWrapper = styled('button', {
  display: 'block',
  fontSize: '14px',
  fontWeight: '700',
  color: '$contentPrimary',
  backgroundColor: '$yellow500',
  paddingBlock: '$3',
  paddingInline: '$5',
  border: 0,
  outline: 0,
  cursor: 'pointer',
  borderRadius: '70px'
})