import axios from 'axios';

// Centralized API configuration using Axios
const api = axios.create({
  baseURL:` ${process.env.NEXT_PUBLIC_API_BASE_URL}/v1`, // URL of your backend API
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log("🚀 ~ file: api.ts:6 ~ process.env.NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL)

export const get = (url: string, config = {}) => api.get(url, config);
export const post = (url: string, data: any, config = {}) => api.post(url, data, config);
export const put = (url: string, data: any, config = {}) => api.put(url, data, config);
export const del = (url: string, config = {}) => api.delete(url, config);

export default api;
