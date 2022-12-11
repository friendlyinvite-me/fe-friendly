import React, { useEffect, useState } from 'react';
import { styled } from '../styles';
import { Location, LocationInfo } from '../utils/types';
import { Text } from './Text';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Button } from './Button';
import { useWindowSize } from '../hooks/use-window-resize';

interface Props {
  location: Location;
}

export const LocationPreview: React.FC<Props> = (props: Props) => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const { name, reference } = props.location;
  const [isExpanded, setExpanded] = useState(false);

  const { 
    placesService,
  } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  
  useEffect(() => {
    if (isExpanded && !locationInfo) {

      placesService?.getDetails({
        placeId: reference,
      }, (location: Location) => {  
        setLocationInfo(location);
      });
    }
  }, [isExpanded, reference, locationInfo]);
  
  const { width } = useWindowSize();
  
  return (
    <LocationPreviewWrapper>
      <Text typography='h3' color='$contentPrimary'>{name}</Text>
      
      { locationInfo && isExpanded &&
        <>
          <Text typography='h4' color='$gray300'>{locationInfo.formatted_address}</Text>
          {
            locationInfo.rating && locationInfo.user_ratings_total && <Text typography='h4' color='$gray300'>{locationInfo.rating} stars ({locationInfo.user_ratings_total} reviews)</Text>
          }
          {
            locationInfo.photos?.length && (
              <PhotosWrapper>
                {
                  locationInfo.photos.slice(0, width < 500 ? 3 : 4).map((photo, index) => (
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