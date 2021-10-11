export function convertDateToTimestamp(date: string): number {
  return Date.parse(date) / 1000;
}

export function convertTimestampToDate(timestamp: number): string {
  const getFormattedNumber = (number: number) => {
    const string = String(number);
    return string.length > 1 ? string : `0${string}`;
  };

  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = getFormattedNumber(date.getMonth() + 1);
  const day = getFormattedNumber(date.getDate());
  const hours = getFormattedNumber(date.getHours());
  const minutes = getFormattedNumber(date.getMinutes());
  const seconds = getFormattedNumber(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}