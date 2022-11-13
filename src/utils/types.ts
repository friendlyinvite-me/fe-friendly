export interface FriendlyEventRow {
  name: string;
  id: string;
  createdAt: Date;
}

export interface FriendlyEventData extends FriendlyEventRow {
  responses: FriendlyEventResponse[];
  createdBy: string;
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