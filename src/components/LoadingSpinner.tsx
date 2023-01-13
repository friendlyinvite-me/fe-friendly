import React from 'react';
import { ColorRing } from  'react-loader-spinner';
import { styled } from '../styles';
import { Text } from './Text';

interface Props { 
  title?: string;
}
export const LoadingSpinner: React.FC<Props> = (props: Props) => {
  const { title } = props;
  return (
    <LoadingSpinnerWrapper>
      {
        title && <Text typography='h2'>{title}</Text>
      }
      <ColorRing
        visible={true}
        height="80"
        width="100%"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['black','black','black','black','black']}
      />
    </LoadingSpinnerWrapper>
  );
};

const LoadingSpinnerWrapper = styled('div', {
  display: 'flex',
  padding: "$10 $2",
  alignItems: 'center',
  flexDirection: 'column',
  gap: '$2',
  width: '100%',
});