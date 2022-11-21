import axios from 'axios';
import { formatApiUrl } from '../utils/api';
import { FriendlyEventData, FriendlyEventRow, NewEventData } from '../utils/types';

export const fetchUserEvents = async (userId: string) => {
  const response = await axios.get(formatApiUrl('getuserevents'), {
    params: {
      'user-id': userId,
    },
  });
  return response.data as FriendlyEventRow[];
};

export const fetchEventInfo = async (eventId: string) => {
  const eventInfoData = await axios.get(formatApiUrl('geteventinfo'), {
    params: {
      'event-id': eventId,
    },
  });
  return eventInfoData.data as FriendlyEventData;
};

export const createEvent = async (data: NewEventData) => {
  const event = await axios.post(formatApiUrl('createevent'), data);
  return event.data as FriendlyEventData;
};