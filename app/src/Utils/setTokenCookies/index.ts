import * as cookie from 'cookie';

import { setCookie } from 'nookies';

export function SetItemCookies(
  name: string,
  value: string,
  options?: cookie.CookieSerializeOptions
) {
  setCookie(undefined, name, value, options);
}
