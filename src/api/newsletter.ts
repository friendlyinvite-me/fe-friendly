import axios from 'axios';
import { formatApiUrl } from '../utils/api';

export const signupNewsletter = async (email: string): Promise<boolean> => {
  const data = await axios.post(formatApiUrl('newslettersignup'), {
    email,
  });
  return data.data as boolean;
};