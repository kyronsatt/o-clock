import { NextApiRequest, NextApiResponse } from "next";
import { google, calendar_v3 } from "googleapis";
import { GaxiosResponse } from "gaxios";
import dayjs from "dayjs";

import { getOAuth2Client } from "./oauth2";

export async function getCalendarsList(calendarClient: calendar_v3.Calendar) {
  return await calendarClient.calendarList.list();
}

export async function getEvents(
  calendarClient: calendar_v3.Calendar,
  calendarId: string
) {
  return await calendarClient.events.list({
    calendarId: calendarId,
    singleEvents: true,
    timeMin: dayjs().startOf("day").toISOString(),
    timeMax: dayjs().endOf("day").toISOString(),
  });
}

async function getEventsFromCalendars(
  calendarClient: calendar_v3.Calendar,
  calendars: GaxiosResponse<calendar_v3.Schema$CalendarList>
) {
  if (calendars.data.items) {
    const eventsPromises = calendars.data.items.map((calendar) => {
      const calendarId = calendar.id;
      return getEvents(calendarClient, calendarId as string);
    });

    return Promise.all(eventsPromises).then((response) => {
      let allEvents: Array<IEvent> = [];
      response.forEach(({ data }) => {
        const returnedEvents = data.items as Array<IEvent>;
        allEvents.push(...returnedEvents);
      });

      return allEvents;
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const oauth2Client = await getOAuth2Client(req, res);
  const calendarClient = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });
  const calendarsList = await getCalendarsList(calendarClient);
  const events = await getEventsFromCalendars(calendarClient, calendarsList);

  res.json(events);
}
