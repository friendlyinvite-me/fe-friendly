import { styled } from '../../../styles';

export const DeleteRow = styled('div', {


  color: '$gray300',
  cursor: 'pointer',
  textDecoration: 'underline',
  marginTop: '$1',
  textAlign: 'center',
  padding: '$1',

  '&:hover': {
    'color': "$contentPrimary",
    backgroundColor: '$gray100',
  },

  '@md': {
    height: '20px',
    position: 'absolute',
    left: 'calc(100% + 25px)',
    top: 0,
    bottom: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
    
    '&:hover': {
      backgroundColor: "transparent",
    },
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