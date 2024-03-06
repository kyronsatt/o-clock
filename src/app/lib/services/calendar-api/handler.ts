import { getEventsMock } from "./mock";

export async function getTodayEvents(): Promise<IGetEventsListResponse> {
    // TODO -> INTEGRATE WITH CALENDAR API
    return getEventsMock
}