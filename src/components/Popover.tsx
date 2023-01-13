import React, { ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { styled } from '../styles';

interface Props {
  items: ReactNode[];
  activator: ReactNode;
}

export const Popover: React.FC<Props> = (props: Props) => {
  return (
    <PopoverWrapper>
      <Menu>
        <Menu.Button>{props.activator}</Menu.Button>
        <Menu.Items>
          {
            props.items.map((item, index) => (
              <Menu.Item key={index}>
                {item}
              </Menu.Item>
            ))
          }
        </Menu.Items>
      </Menu>

    </PopoverWrapper>
  );
};

const PopoverWrapper = styled('div', {
  position: 'relative',

  '& > button': {
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    border: 0,
  },

  '& > div' : {
    position: 'absolute',
    right: 0,
    top: '105%',
    backgroundColor: "white",
    border: '1px solid $borderPrimary',
    zIndex: 1,
    borderRadius: '5px',
    color: '$contentPrimary',
    padding: '$3',
    minWidth: '150px',
    display: 'flex',
    flexDirection: 'column',
    gap: "$3",
  },
});