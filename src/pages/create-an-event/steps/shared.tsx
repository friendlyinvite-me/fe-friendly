import { styled } from '../../../styles';

export const DeleteRow = styled('div', {
  position: 'absolute',
  left: 'calc(100% + 25px)',
  top: 0,
  bottom: 0,
  marginTop: 'auto',
  marginBottom: 'auto',
  height: '20px',
  color: '$gray300',
  cursor: 'pointer',
  textDecoration: 'underline',

  '&:hover': {
    'color': "$contentPrimary",
  },
});

export const SuggestAnotherButton = styled('button', {
  outline: 0,
  border: 0,
  typography: 'h4',
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'underline',
  backgroundColor: 'transparent',
  paddingBlock: '$3',
});