export function convertDateToTimestamp(date: string) {
  return Date.parse(date) / 1000;
}