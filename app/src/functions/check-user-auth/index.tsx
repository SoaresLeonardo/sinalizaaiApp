import { GetItemCookies } from '@/Utils/getTokenCookies';

export const CheckUserAuth = () => {
  const authUser = GetItemCookies('SinalizaAi.token');

  return !!authUser;
};
