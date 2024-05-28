import axios from 'axios';

export const tesloApi = axios.create({
  baseURL: import.meta.env.VIE_BASE_URL,
});
