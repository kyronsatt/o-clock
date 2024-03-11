import dayjs from "dayjs";

export async function getTodayEvents(calendarId: string) {
    const GOOGLE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (!PUBLIC_KEY) return 

    const params = [
        `/events?key=${PUBLIC_KEY}`,
        '&orderBy=startTime',
        '&singleEvents=True',
        `&timeMin=${dayjs().startOf('day').toISOString()}`,
        `&timeMax=${dayjs().endOf('day').toISOString()}`,
    ]
    const dataUrl = [GOOGLE_CALENDAR_URL, calendarId, ...params].join('');
  
    const response = await fetch(dataUrl);
    
    return await response.json();
}