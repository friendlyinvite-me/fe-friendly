import axios from 'axios';
import { formatApiUrl } from '../utils/api';
import { FriendlyEventData, FriendlyEventRow, NewEventData, NewEventResponseData } from '../utils/types';

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


export interface DeleteEventRequest {
  userId: string;
  eventId: string;
}

export const deleteEvent = async (data: DeleteEventRequest) => {
  const userResponse = await axios.post(formatApiUrl('deleteevent'), data);
  return userResponse.data as boolean;
};

export const createEventResponse = async (data: NewEventResponseData) => {
  const eventResponse = await axios.post(formatApiUrl('createeventresponse'), data);
  return eventResponse.data as boolean;
};