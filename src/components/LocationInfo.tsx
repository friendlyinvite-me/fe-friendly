import React from 'react';
import { styled } from '../styles';
import { LocationInfo } from '../utils/types';
import { Text } from './Text';
import { useWindowSize } from '../hooks/use-window-resize';

interface Props {
  locationInfo: LocationInfo;
}

export const LocationInformation: React.FC<Props> = (props: Props) => {
  const { width } = useWindowSize();
  
  const {
    locationInfo,
  } = props;


  return (
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
  );
};



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