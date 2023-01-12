import React, { useEffect, useState } from 'react';
import { styled } from '../styles';
import { Location, LocationInfo } from '../utils/types';
import { Text } from './Text';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Button } from './Button';
import { useWindowSize } from '../hooks/use-window-resize';
import { useLocationInfo } from '../hooks/use-location-info';
import { LocationInformation } from './LocationInfo';

interface Props {
  location: Location;
}

export const LocationPreview: React.FC<Props> = (props: Props) => {
  
  const {
    locationInfo,
    isExpanded,
    setExpanded,
    name,
  } = useLocationInfo(props.location);

  
  return (
    <LocationPreviewWrapper>
      <Text typography='h3' color='$contentPrimary'>{name}</Text>
      
      { locationInfo && isExpanded &&
        <LocationInformation locationInfo={locationInfo}  />
      }
      <Button sentiment='secondary' onClick={() => setExpanded(!isExpanded)}>{isExpanded ? 'Hide info' : "Show more info"}</Button>
    </LocationPreviewWrapper>
  );
};

const LocationPreviewWrapper = styled('div', {
  width: '100%',
  border: '1px solid $borderPrimary',
  color: '$contentPrimary',
  borderRadius: "10px",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: '$4',
  gap: '$3',
});

const PhotosWrapper = styled('div', {
  display: 'flex',
  gap: '$1',
  alignItems: 'center',
  justifyContent: 'start',
  height: '80px',
});

const Photo = styled('div', {
  width: '80px',
  height: '80px',
  backgroundSize: 'cover',
  backgroundColor: 'black',
  borderRadius: '10px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});