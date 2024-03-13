export async function getTodayEvents() {
  return fetch("/api/calendar");
}
