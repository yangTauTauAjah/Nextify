

export function parseCookie(str: string): Record<string, string | undefined> {
  return str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc: NodeJS.Dict<string>, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}

export const timeToSec = (
  sec: number = 0,
  min: number = 0,
  hour: number = 0,
  day: number = 0,
  month: number = 0
): number => sec + 60 * (min + 60 * (hour + 24 * (day + month * 30)));