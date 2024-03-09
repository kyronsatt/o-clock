export function calculateTimeAsDailyPercentage(time: Date) {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const totalMinutes = hours * 60 + minutes;
  const timeAsDailyPercentage = totalMinutes / 1440;

  return timeAsDailyPercentage;
}
