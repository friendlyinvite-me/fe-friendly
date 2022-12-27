import { User as FirebaseUser } from 'firebase/auth';
import { type } from 'os';

export interface FriendlyEventRow {
  name: string;
  id: string;
  createdAt: Date;
  status: 'draft' | 'planning' | 'finalized'
}

export type ProposalType = 'datetime' | 'location';

export interface FriendlyEventData extends FriendlyEventRow {
  responses: FriendlyEventResponse[];
  suggestions: FriendlyEventSuggestion[];
  user: FriendlyUser;
}

export interface FriendlyEventSuggestion {
  id: string;
  type: ProposalType;
  userId: string;
  actionId: string;
  responseId: string;
  upvotes: string[];
  downvotes: string[];
  value: ResponseValue;
  createdAt?: string;
}

export type ResponseValue = string | Location;

export interface FriendlyEventResponse {
  id: string;
  userId: string;
  user?: FriendlyUser;
  comments?: string;
  createdAt?: string;
  actions: FriendlyEventResponseAction[];
}

export type FriendlyEventResponseAction = |
  FriendlyEventResponseActionDateTime |
  FriendlyEventResponseActionLocation |
  FriendlyEventResponseActionVote;

export interface FriendlyEventResponseActionDateTime {
  id: string;
  type: 'datetime';
  value: string;
  createdAt?: string;
}

export interface FriendlyEventResponseActionLocation {
  id: string;
  type: 'location';
  value: Location;
  createdAt?: string;
}

export interface FriendlyEventResponseActionVote {
  id: string;
  type: 'upvote' | 'downvote' | 'undovote';
  value: string; // suggestion_id
  createdAt?: string;
}

export interface NewFriendlyUserCreation {
  uid: string;
  name: string | null;
  authProvider: 'google';
  email: string | null;
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
  dateTimes: { id: string; value: string }[];
  locations: { id: string; value: Location }[];
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

export interface NewEventResponseData {
  eventId: string;
  userId: string;
  actions: FriendlyEventResponseAction[];
  comment?: string;
}