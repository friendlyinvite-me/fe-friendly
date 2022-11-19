import axios from 'axios';
import { formatApiUrl } from '../utils/api';
import { FriendlyUser } from '../utils/types';

export const fetchUser = async (email: string) => {
  const data = await axios.get(formatApiUrl('getuser'), {
    params: {
      'email': email
    }
  })
  return data.data as FriendlyUser;
}