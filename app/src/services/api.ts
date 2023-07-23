import { GetItemCookies } from '@/Utils/getTokenCookies';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/'
});

api.interceptors.request.use((request) => {
  const headers = request.headers ?? {};

  const token = GetItemCookies('SinalizaAi.token');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  request.headers = headers;

  return request;
});
