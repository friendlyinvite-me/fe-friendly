import { User as FirebaseUser } from 'firebase/auth';

export interface FriendlyEventRow {
  name: string;
  id: string;
  createdAt: Date;
  status: 'draft' | 'created' | 'planning' | 'finalized'
}

export interface FriendlyEventData extends FriendlyEventRow {
  responses: FriendlyEventResponse[];
  createdBy: {
    name: string;
    userId: string;
  };
}

export interface FriendlyEventResponse {
  name: string;
  comments?: string;
  actions: FriendlyEventResponseAction[];
}

export interface FriendlyEventResponseAction {
  type: 'location' | 'datetime',
  value: "string"

}

export interface FriendlyUser {
  id: string;
}

export type User = FirebaseUser & FriendlyUser;

export interface NewEventData {
  name: string;
  userId: string;
  dateTimes: Date[];
  locations: Location[];
}

export interface Location {
  name: string;
  reference: string;
  formatted_phone_number?: string;
  formatted_address?: string;
  icon?: string;
  icon_background_color?: string;
  opening_hours?: {
    isOpen: (...arg: any) => any;
    weekday_text: string[];
  }
  reviews?: [
    {
      text: string;
      rating: number;
      relative_time_description: string;
    }
  ],
  photos?: [
    {
      getUrl: (...args: any) => any;
      height: number;
      width: number;
    }
  ],
  website?: string;
  rating?: number;
  user_ratings_total?: number;

}