import { createContext } from 'react';
import { User } from '../utils/types';

// context default is null
interface ContextData {
  user: User | null;
  isLoading: boolean;
}

export const UserContext = createContext<ContextData>({
  user: null,
  isLoading: true,
});