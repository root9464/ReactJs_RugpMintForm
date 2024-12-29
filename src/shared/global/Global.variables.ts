import axios from 'axios';

export const collectionAdress: Readonly<string> = import.meta.env.VITE_PUBLIC_COLLECTION_ADDRESS ?? '';
const tonapiToken: Readonly<string> = import.meta.env.VITE_PUBLIC_TONAPI_KEY ?? '';

export const axiosInstance = axios.create({
  baseURL: 'https://tonapi.io/v2/',
  headers: {
    Authorization: tonapiToken,
  },
});
