import axios from 'axios';
import { useAuthStore } from '../stores';

export const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// interceptors
tesloApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
