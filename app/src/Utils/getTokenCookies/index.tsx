import { parseCookies } from 'nookies';

export function GetItemCookies(key: string) {
  const cookies = parseCookies();

  const item = cookies[key];

  if (!item) {
    return null;
  }

  return item ?? null;
}
