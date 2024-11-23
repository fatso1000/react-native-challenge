export function getMonthTimestamps(year: number, month: number): string {
  const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59));

  const after = Math.floor(startOfMonth.getTime() / 1000);
  const before = Math.floor(endOfMonth.getTime() / 1000); // `month` here is the next month with day 0 (last day of the previous month)

  return `?after=${after}&before=${before}`;
}

export function splitAndFormatDate(dateString: string): {
  year: number;
  month: number;
} {
  const [year, month] = dateString.split("-").map(Number);
  return { year, month };
}
