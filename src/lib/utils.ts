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

/**
 * Convert a HEX color to HSL 
 * Use modifiers to modify the final % from the orginal color
 */
export function hexToHSL(hexColor: string, hueModifier: number, saturationModifier: number, lightModifier: number): string {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (hexColor.length == 4) {
    r = ("0x" + hexColor[1] + hexColor[1]) as any / 255;
    g = ("0x" + hexColor[2] + hexColor[2]) as any / 255;
    b = ("0x" + hexColor[3] + hexColor[3]) as any / 255;
  } else if (hexColor.length == 7) {
    r = ("0x" + hexColor[1] + hexColor[2]) as any / 255;
    g = ("0x" + hexColor[3] + hexColor[4]) as any / 255;
    b = ("0x" + hexColor[5] + hexColor[6]) as any / 255;
  }
  // Then to HSL
  let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  // Add modified to hue, light and saturation
  if (hueModifier) {
    h = h + hueModifier;
  }
  if (saturationModifier) {
    s = s + saturationModifier;
  }
  if (lightModifier) {
    l = l + lightModifier;
  }

  return `hsl(${h},${s}%,${l}%)`;
}


export function getTimestampTenSecondsPrior(): Date {
  const time = new Date();
  time.setSeconds(time.getSeconds() - 10);
  return time;
}
