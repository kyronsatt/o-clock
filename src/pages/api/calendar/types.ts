interface IEvent {
  id: string;
  kind: string;
  summary: string;
  start: IEventTime;
  description?: string;
  [x: string]: unknown;
}

type IEventsList = Array<IEvent>;

interface IEventCreationPayload {
  summary: string;
  start: IEventTime;
  end: IEventTime;
}

interface IGetEventsListResponse {
  kind: string;
  etag: string;
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: Array<any>;
  nextSyncToken: string;
  items: IEventsList;
}

interface IEventTime {
  dateTime: string;
  timeZone: string;
}
