export function calculateDayCompletionPercentage(time: Date) {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  const totalMinutes = hours * 60 + minutes;
  const dayCompletionPercentage = totalMinutes / 1440;

  return dayCompletionPercentage;
}
