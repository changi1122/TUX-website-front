import useAuthStore from '../stores/useAuthStore';
import client, { publicClient, getApiErrorMessage } from './client';

export const login = async ({ username, password }) => {
    try {
        const { data } = await publicClient.post('/api/auth', { username, password });

        localStorage.setItem('expiresIn', data.refreshToken.expiresIn);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('nickname', data.user.nickname);
        localStorage.setItem('role', data.user.role);

        useAuthStore.getState().login(data);

        return { success: true };
    }
    catch (error) {
        return {
            success: false,
            message: getApiErrorMessage(error, '로그인에 실패하였습니다. 다시 시도해 주세요.')
        };
    }
}

export const logout = async () => {
    try {
        // 서버 응답을 통해 쿠키 삭제
        await publicClient.delete('/api/auth');

        localStorage.clear();

        useAuthStore.getState().logout();
        return { success: true };
    }
    catch (error) {
        return {
            success: false,
            message: getApiErrorMessage(error, '로그아웃에 실패하였습니다. 다시 시도해 주세요.')
        };
    }
}

export const fetchCurrentUser = async () => {
    const { data } = await client.get('/api/auth');
    return data;
}

export const fetchCurrentUserForRestore = async () => {
    const { data } = await publicClient.get('/api/auth');
    return data;
}

export const updateUser = async ({ userId, key, value }) => {
    await client.put(`/api/user/${userId}`, { [key]: value });
    return { key, value };
}

export const deleteUser = async (userId) => {
    await client.delete(`/api/user/${userId}`);
    localStorage.clear();
    useAuthStore.getState().logout();
    return { success: true };
}

export const signup = async ({ username, password, nickname, email, phoneNumber,
                                      department, studentNumber }) => {
    try {
        await publicClient.post('/api/user', {
            username, password, nickname, email, phoneNumber, department, studentNumber,
        });
        return { success: true };
    }
    catch (error) {
        return {
            success: false,
            message: getApiErrorMessage(error, '회원가입 중 오류가 발생하였습니다.')
        };
    }
}

export const checkUsernameDuplicate = async (username) => {
    try {
        const { data } = await publicClient.get(`/api/user/check/username?username=${username}`);
        return {
            success: true,
            isDuplicated: !data,
        };
    } catch (error) {
        return {
            success: false,
            message: getApiErrorMessage(error, '서버와 통신 중 문제가 발생했습니다.')
        };
    }
}