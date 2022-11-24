import React from 'react';
import { LocationCard } from '../../../components/LocationCard';
import { LocationInput } from '../../../components/LocationInput';
import { styled } from '../../../styles';
import { Location } from '../../../utils/types';
import { DeleteRow } from './shared';

interface Props {
  locations: {id: number; value: Location}[];
  onSetLocations: (arr: {id: number; value: Location}[]) => void;
}

export const LocationStep: React.FC<Props> = (props: Props) => {
  const { locations, onSetLocations } = props;

  return (
    <Wrapper>
      <LocationInput
        onSelectLocation={(location) => {
          if (!locations.find(l => l.value.reference === location.reference)) {
            const {
              name, 
              reference, 
            } = location;

            onSetLocations([...locations, {
              id: locations.length ? locations[locations.length - 1].id + 1 : 0,
              value: {
                name, 
                reference, 
              },
            }]);
          }
        }}
      />
      {
        locations.map((item, index) => (
          <LocationItemWrapper key={`${index}__${item.value.reference.toString()}`}>
            <LocationCard location={item.value} />
            <DeleteRow onClick={() => {
              const removed = locations.filter((location, i) => i !== index);
              onSetLocations(removed);
            }}>Delete</DeleteRow>
          </LocationItemWrapper>
        ))
      }
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  alignItems: 'center',
  width: '400px',
});

const LocationItemWrapper = styled('div', {
  position: 'relative',
  width: '100%',
});