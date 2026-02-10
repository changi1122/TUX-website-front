import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';

let isLoggingOut = false;

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !isLoggingOut) {
            isLoggingOut = true;
            localStorage.clear();
            sessionStorage.clear();
            useAuthStore.getState().logout();
            alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const publicClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

export default client;
