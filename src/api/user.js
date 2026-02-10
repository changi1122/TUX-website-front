import useAuthStore from '../stores/useAuthStore';
import client, { publicClient } from './client';

export const login = async ({ username, password, keepAuth }) => {
    try {
        const { data } = await publicClient.post('/api/auth', { username, password });

        // localStorage 또는 sessionStorage에 저장
        const storage = keepAuth ? localStorage : sessionStorage;
        storage.setItem('expiresIn', data.refreshToken.expiresIn);
        storage.setItem('userId', data.user.id);
        storage.setItem('username', data.user.username);
        storage.setItem('nickname', data.user.nickname);
        storage.setItem('role', data.user.role);

        useAuthStore.getState().login(data);

        return { success: true };
    }
    catch {
        return {
            success: false,
            message: '로그인에 실패하였습니다. 다시 시도해 주세요.'
        };
    }
}

export const logout = async () => {
    try {
        // 서버 응답을 통해 쿠키 삭제
        await publicClient.delete('/api/auth');

        localStorage.clear();
        sessionStorage.clear();

        useAuthStore.getState().logout();
        return { success: true };
    }
    catch {
        return {
            success: false,
            message: '로그아웃에 실패하였습니다. 다시 시도해 주세요.'
        };
    }
}

export const fetchCurrentUser = async () => {
    const { data } = await client.get('/api/auth');
    return data;
}

export const updateUser = async ({ userId, key, value }) => {
    await client.put(`/api/user/${userId}`, { [key]: value });
    return { key, value };
}

export const deleteUser = async (userId) => {
    await client.delete(`/api/user/${userId}`);
    localStorage.clear();
    sessionStorage.clear();
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
    catch {
        return {
            success: false,
            message: '회원가입 중 오류가 발생하였습니다.'
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
    } catch {
        return {
            success: false,
            message: '서버와 통신 중 문제가 발생했습니다.'
        };
    }
}
