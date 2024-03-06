
interface IEvent {
  id: string;
  kind: string;
  summary: string;
  start: IEventStart;
  description?: string;
  [x: string]: unknown;
}

type IEventsList = Array<IEvent>;

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
  items: IEventsList
}

interface IEventStart {
    dateTime: string;
    timeZone: string;
  }
  