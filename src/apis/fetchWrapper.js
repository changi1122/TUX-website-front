import useAuthStore from '../stores/useAuthStore';

let isLoggingOut = false;

const fetchWrapper = async (url, options = {}) => {
    const response = await fetch(url, options);

    if (response.status === 401 && !isLoggingOut) {
        isLoggingOut = true;

        localStorage.clear();
        sessionStorage.clear();
        useAuthStore.getState().logout();

        alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login';
    }

    return response;
};

export default fetchWrapper;
