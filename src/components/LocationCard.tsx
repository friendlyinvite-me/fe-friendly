import React from 'react';
import { styled } from '../styles';
import { Location } from '../utils/types';
import { Text } from './Text';

interface Props {
  location: Location;
}

export const LocationCard: React.FC<Props> = (props: Props) => {
  const { name, formatted_address, rating, user_ratings_total, photos } = props.location;
  return (
    <LocationCardWrapper>
      <Text typography='h3' color='$contentPrimary'>{name}</Text>
      <Text typography='h4' color='$gray300'>{formatted_address}</Text>
      {
        rating && user_ratings_total && <Text typography='h4' color='$gray300'>{rating} stars ({user_ratings_total} reviews)</Text>
      }
      {
        photos?.length && (
          <PhotosWrapper>
            {
              photos.slice(0, 4).map((photo, index) => (
                <Photo key={index} css={{
                  backgroundImage: `url(${photo.getUrl()})`,
                }}/>
              ))
            }
          </PhotosWrapper>
        )
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