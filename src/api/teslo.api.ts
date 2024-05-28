import axios from 'axios';

export const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
