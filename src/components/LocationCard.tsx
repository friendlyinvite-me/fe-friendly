import React, { useEffect, useState } from 'react';
import { styled } from '../styles';
import { Location, LocationInfo } from '../utils/types';
import { Text } from './Text';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

interface Props {
  location: Location;
}

export const LocationCard: React.FC<Props> = (props: Props) => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const { name, reference } = props.location;
  
  // need to fetch rest of info from gAPI

  return (
    <LocationCardWrapper>
      <Text typography='h3' color='$contentPrimary'>{name}</Text>
      { locationInfo &&
        <>
          <Text typography='h4' color='$gray300'>{locationInfo.formatted_address}</Text>
          {
            locationInfo.rating && locationInfo.user_ratings_total && <Text typography='h4' color='$gray300'>{locationInfo.rating} stars ({locationInfo.user_ratings_total} reviews)</Text>
          }
          {
            locationInfo.photos?.length && (
              <PhotosWrapper>
                {
                  locationInfo.photos.slice(0, 4).map((photo, index) => (
                    <Photo key={index} css={{
                      backgroundImage: `url(${photo.getUrl()})`,
                    }}/>
                  ))
                }
              </PhotosWrapper>
            )
          }
        </>
      }
    </LocationCardWrapper>
  );
};

const LocationCardWrapper = styled('div', {
  width: '100%',
  border: '1px solid $gray200',
  color: '$contentPrimary',
  borderRadius: "10px",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: '$4',
  gap: '$2',
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
  backgroundSize: 'contain',
  backgroundColor: 'black',
  borderRadius: '10px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});