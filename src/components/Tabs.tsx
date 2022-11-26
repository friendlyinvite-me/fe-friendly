import { styled } from '../styles';

export const Tabs = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$4',
  alignItems: 'center',
  justifyContent: 'start',
  marginBlock: '$6',
});


export const Tab = styled('button', {
  display: 'inline-block',
  typography: 'h4',
  margin: 0,
  backgroundColor: 'transparent',
  padding: 0,
  border: 0,
  outline: 0,
  cursor: 'pointer',
  position: 'relative',

  '&:after': {
    top: 'calc(100% + 10px)',
    left: 0,
    width: '15px',
    height: '5px',
    borderRadius: '15px',
    backgroundColor: '$yellow500',
    content: '',
    position: 'absolute',
  },

  variants: {
    sentiment: {
      default: {
        fontWeight: 400,
        opacity: 0.5,
        
        '&:after': {
          backgroundColor: 'transparent',
        },
      },
      selected: {
        fontWeight: 700,

      },
    },
  },
  defaultVariants: {
    sentiment: 'default',
  },
});