import { User } from 'firebase/auth';
import { createContext } from 'react';

// context default is null
interface ContextData {
  user: User | null;
  isLoading: boolean;
}

export const UserContext = createContext<ContextData>({
  user: null,
  isLoading: true
});