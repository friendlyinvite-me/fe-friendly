import React, { useEffect, useState } from 'react';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Location } from '../utils/types';
import { Size } from '.';
import { Combobox } from '@headlessui/react';
import { styled, css } from '../styles';

interface AutocompleteResult {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  }
}

interface Props {
  onSelectLocation: (val: Location) => void;
}

export const LocationInput: React.FC<Props> = (props: Props) => {

  const [queryValue, setQueryValue] = useState('');
  const [selectedSearchResult, setSelectedSearchResult] = useState<AutocompleteResult | null>(null);

  const { 
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading, 
  } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  useEffect(() => {
    if (selectedSearchResult)
      placesService?.getDetails({
        placeId: selectedSearchResult.place_id,
      }, (location: Location) => {  
        props.onSelectLocation(location);
      },
      );
  }, [selectedSearchResult]);

  return (
    <StyledInput>
      <Combobox
        value={selectedSearchResult}
        onChange={setSelectedSearchResult}
      >
        <Combobox.Input
          placeholder='Suggest a place, like Central Perk Cafe'
          value={queryValue}
          onChange={(event) => {
            getPlacePredictions({
              input: event.currentTarget.value,
            });
            setQueryValue(event.target.value);
          }} />
        <Combobox.Options>
          { isPlacePredictionsLoading ? <li>loading</li> : placePredictions.length ?
            placePredictions.map((prediction: AutocompleteResult) => (
              <Combobox.Option key={prediction.place_id} value={prediction}>
                {prediction.description}
              </Combobox.Option>
            )) : <li>Start typing to search</li>
          }
        </Combobox.Options>
      </Combobox>
    </StyledInput>
  );
};

export const StyledInput = styled('div', {
  position: 'relative',
  width: '100%',

  input: {
    border: '1px solid $borderPrimary',
    width: '100%',
    color: '$contentPrimary',
    borderRadius: "10px",
    typography: 'h4',
    padding: '$4 $6',

    '&:focus': {
      border: '1px solid black',
      outline: 0,
    },

    defaultVariants: {
      size: 'medium',
    },
  },

  ul: {
    width: '100%',
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: 0,
    border: '1px solid $borderPrimary',
    margin : 0,
    backgroundColor: 'white',
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    padding: 0,
    borderRadius: '10px',
    overflow: 'hidden',
    zIndex: 1,
  },

  li: {
    padding: '$2 $3',
  },

  'li:hover': {
    backgroundColor: '$gray200',
    cursor: 'pointer',
  },

});