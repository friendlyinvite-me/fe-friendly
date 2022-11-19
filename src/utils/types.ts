import { User as FirebaseUser } from 'firebase/auth';

export interface FriendlyEventRow {
  name: string;
  id: string;
  createdAt: Date;
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