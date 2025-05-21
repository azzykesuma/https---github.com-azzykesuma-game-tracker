export function parseUnixTimestampToUTC(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toUTCString();
}

export function convertMinutesTohour (minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function convertMinutesToDays(totalMinutes : number) {
  if (typeof totalMinutes !== 'number' || totalMinutes < 0) {
    return "Invalid input: Please provide a non-negative number of minutes.";
  }

  const minutesInAnHour = 60;
  const hoursInADay = 24;
  const minutesInADay = minutesInAnHour * hoursInADay; // 1440 minutes in a day

  const days = totalMinutes / minutesInADay;

  // You might want to return a rounded number, or keep it as a float depending on precision needs
  // For "how many days has passed", often a decimal is useful to show partial days.
  // If you want full days, use Math.floor()

  return Math.floor(days);
}
