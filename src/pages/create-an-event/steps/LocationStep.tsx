import React from 'react';
import { Text } from '../../../components';
import { LocationPreview } from '../../../components/LocationPreview';
import { LocationInput } from '../../../components/LocationInput';
import { styled } from '../../../styles';
import { Location } from '../../../utils/types';
import { DeleteRow } from './shared';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  locations: {id: string; value: Location}[];
  onSetLocations: (arr: {id: string; value: Location}[]) => void;
}

export const LocationStep: React.FC<Props> = (props: Props) => {
  const { locations, onSetLocations } = props;

  return (
    <Wrapper>
      <LocationInput
        onSelectLocation={(location: Location) => {
          // add if not exist already
          if (!locations.find(l => l.value.reference === location.reference)) {
            const {
              name, 
              reference,
              url,
            } = location;

            onSetLocations([...locations, {
              id: uuidv4(),
              value: {
                name, 
                reference, 
                url,
              },
            }]);
          }
        }}
      />
      <Text color='$gray300' typography='p'>Pro tip: You can suggest as many as you would like</Text>
      {
        locations.map((item, index) => (
          <LocationItemWrapper key={`${index}__${item.value.reference.toString()}`}>
            <LocationPreview location={item.value} />
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
  width: '100%',
});

const LocationItemWrapper = styled('div', {
  position: 'relative',
  width: '100%',
});


