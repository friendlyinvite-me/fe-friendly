import { useEffect, useState } from 'react';
import usePlacesAutocompleteService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { Location, LocationInfo } from '../utils/types';

export const useLocationInfo = (location: Location) => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [isExpanded, setExpanded] = useState(false);
  const { name, reference } = location;

  const {
    placesService,
  } = usePlacesAutocompleteService({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  useEffect(() => {
    if (isExpanded && !locationInfo) {
      placesService?.getDetails({
        placeId: reference,
      }, (locationInfo: LocationInfo) => {
        setLocationInfo(locationInfo);
      });
    }
  }, [isExpanded, reference, locationInfo]);

  return {
    locationInfo,
    isExpanded,
    name,
    reference,
    setExpanded,
  };
};