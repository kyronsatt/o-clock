import { NextApiRequest, NextApiResponse } from "next";
import { google, calendar_v3 } from "googleapis";

import { getOAuth2Client } from "../oauth2";

export async function createEvent(
  calendarClient: calendar_v3.Calendar,
  eventPayload: IEventCreationPayload
) {
  return await calendarClient.events.insert({
    calendarId: "primary",
    requestBody: eventPayload,
  });
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
  const eventPayload = req.body as IEventCreationPayload;

  if (!eventPayload) throw Error("Event payload should be provided.");
  const createdEvent = await createEvent(calendarClient, eventPayload);

  res.json(createdEvent);
}
