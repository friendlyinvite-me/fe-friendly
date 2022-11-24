import { User as FirebaseUser } from 'firebase/auth';

export interface FriendlyEventRow {
  name: string;
  id: string;
  createdAt: Date;
  status: 'draft' | 'planning' | 'finalized'
}

export interface FriendlyEventData extends FriendlyEventRow {
  responses: FriendlyEventResponse[];
  createdBy: {
    name: string;
    userId: string;
  };
}

export interface FriendlyEventResponse {
  id: string;
  userId: string;
  user?: FriendlyUser;
  comments?: string;
  actions: FriendlyEventResponseAction[];
}

export type FriendlyEventResponseAction = FriendlyEventResponseActionDateTime | FriendlyEventResponseActionLocation;

export interface FriendlyEventResponseActionDateTime {
  type: 'datetime',
  value: string;
}

export interface FriendlyEventResponseActionLocation {
  type: 'location',
  value: Location;
}

export interface FriendlyUser {
  id: string;
  email: string;
  name: string;
}

export type User = FirebaseUser & FriendlyUser;

export interface NewEventData {
  name: string;
  userId: string;
  dateTimes: string[];
  locations: Location[];
}

export interface Location {
  name: string;
  reference: string;
}

export interface LocationInfo extends Location {
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