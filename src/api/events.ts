import axios from 'axios';
import { formatApiUrl } from '../utils/api';

export const fetchUserEvents = async (userId: string) => {
  return axios.get(formatApiUrl('getuserevents'), {
    params: {
      'user-id': userId
    }
  })
}

export const fetchEventInfo = async (eventId: string) => {
  const eventInfoData = await axios.get(formatApiUrl('geteventinfo'), {
    params: {
      'event-id': eventId
    }
  })
  return eventInfoData.data;
}