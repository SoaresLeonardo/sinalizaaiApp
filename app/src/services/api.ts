import { GetItemCookies } from '@/Utils/getTokenCookies';
import axios from 'axios';
import https from 'https';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
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
