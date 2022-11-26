import axios from 'axios';
import { formatApiUrl } from '../utils/api';
import { FriendlyUser, NewFriendlyUserCreation } from '../utils/types';

export const fetchUser = async (email: string) => {
  const data = await axios.get(formatApiUrl('getuser'), {
    params: {
      'email': email,
    },
  });
  return data.data as FriendlyUser;
};

export const createUser = async (data: NewFriendlyUserCreation) => {
  const userResponse = await axios.post(formatApiUrl('createuser'), data);
  return userResponse.data as NewFriendlyUserCreation;
};