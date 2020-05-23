/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber(date: Date): [number, number] {
  // Copy date so don't modify original
  const dateCopy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - (dateCopy.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(dateCopy.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((+dateCopy - +yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return [dateCopy.getUTCFullYear(), weekNo];
}

export function getCurrentWeek(): [number, number] {
  return getWeekNumber(new Date());
}

export function getStartOfWeek(): Date {
  const date = new Date();
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const startOfWeek = new Date(date.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

export function getEndOfWeek(): Date {
  const date = getStartOfWeek();
  date.setDate(date.getDate() + 6);
  date.setHours(23, 59, 59, 0);
  return date;
}
