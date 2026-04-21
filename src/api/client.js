import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

export const publicClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

const forceLogout = () => {
    localStorage.clear();
    useAuthStore.getState().logout();
    alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
    if (window.location.pathname !== '/login')
        window.location.href = '/login';
};

let refreshPromise = null;

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status !== 401) return Promise.reject(error);

        if (error.config._isRetry) {
            forceLogout();
            return Promise.reject(error);
        }

        if (!refreshPromise) {
            refreshPromise = publicClient.post('/api/auth/refresh')
                .finally(() => { refreshPromise = null; });
        }

        try {
            await refreshPromise;
            error.config._isRetry = true;
            return client(error.config);
        } catch {
            forceLogout();
            return Promise.reject(error);
        }
    }
);

export const getApiErrorMessage = (error, fallback = '오류가 발생하였습니다.') => {
    return error?.response?.data?.message || fallback;
};

export default client;