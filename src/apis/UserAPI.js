import useAuthStore from '../stores/useAuthStore';
import fetchWrapper from './fetchWrapper';

export const login = async ({ username, password, keepAuth }) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/auth`;

    const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            username,
            password,
        })
    });

    if (response.ok) {
        const result = await response.json();

        // localStorage 또는 sessionStorage에 저장
        if (keepAuth === true) {
                // 로그인 유지
                localStorage.setItem('expiresIn', result.refreshToken.expiresIn);
                localStorage.setItem('userId', result.user.id);
                localStorage.setItem('username', result.user.username);
                localStorage.setItem('nickname', result.user.nickname);
                localStorage.setItem('role', result.user.role);
            }
            else {
                sessionStorage.setItem('expiresIn', result.refreshToken.expiresIn);
                sessionStorage.setItem('userId', result.user.id);
                sessionStorage.setItem('username', result.user.username);
                sessionStorage.setItem('nickname', result.user.nickname);
                sessionStorage.setItem('role', result.user.role);
            }

        useAuthStore.getState().login(result);

        return { success: true };
    }
    else {
        return {
            success: false,
            message: '로그인에 실패하였습니다. 다시 시도해 주세요.'
        };
    }
}

export const logout = async () => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/auth`;

    // 서버 응답을 통해 쿠키 삭제
    const response = await fetch(requestURL, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (response.ok) {
        localStorage.clear();
        sessionStorage.clear();

        useAuthStore.getState().logout();
        return { success: true };
    }
    else {
        return {
            success: false,
            message: '로그아웃에 실패하였습니다. 다시 시도해 주세요.'
        };
    }
}

export const fetchCurrentUser = async () => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/auth`;

    const response = await fetchWrapper(requestURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (!response.ok) throw new Error('회원 정보 조회 중 오류가 발생하였습니다.');
    return response.json();
}

export const updateUser = async ({ userId, key, value }) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/user/${userId}`;

    const response = await fetchWrapper(requestURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            [key]: value
        })
    });

    if (!response.ok) throw new Error('회원 정보 변경 중 오류가 발생하였습니다.');
    return { key, value };
}

export const deleteUser = async (userId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/user/${userId}`;

    const response = await fetchWrapper(requestURL, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (response.ok) {
        localStorage.clear();
        sessionStorage.clear();
        useAuthStore.getState().logout();
        return { success: true };
    }
    else {
        throw new Error('회원 탈퇴 중 오류가 발생하였습니다.');
    }
}

export const callSignupAPI = async ({ username, password, nickname, email, phoneNumber,
                                      department, studentNumber }) => {

    const requestURL = `${import.meta.env.VITE_API_URL}/api/user`;

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                nickname,
                email,
                phoneNumber,
                department,
                studentNumber
            })
        });

        if (response.ok) {
            return { success: true };
        }
        else {
            return {
                success: false,
                message: '회원가입 중 오류가 발생하였습니다.'
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: '서버와 통신 중 문제가 발생했습니다.'
        };
    }
}

export const checkUsernameDuplicationAPI = async (username) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/user/check/username?username=${username}`;

    try {
        const response = await fetch(requestURL, {
            method: 'GET'
        });

        if (response.ok) {
            const resultBool = await response.json();

            return {
                success: true,
                isDuplicated: !resultBool
            };
        }

    } catch (error) {
        return {
            success: false,
            message: '서버와 통신 중 문제가 발생했습니다.'
        };
    }
}
