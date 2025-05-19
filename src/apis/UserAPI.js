import { actions } from '../modules/UserModule';

export const callLoginAPI = ({ username, password, keepAuth }) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/auth`;

    return async (dispatch, getState) => {
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
                    localStorage.setItem('token', result.token.token);
                    localStorage.setItem('expiresIn', result.token.expiresIn);
                    localStorage.setItem('userId', result.id);
                    localStorage.setItem('username', result.username);
                    localStorage.setItem('nickname', result.nickname);
                    localStorage.setItem('role', result.role);
                }
                else {
                    sessionStorage.setItem('token', result.token.token);
                    sessionStorage.setItem('expiresIn', result.token.expiresIn);
                    sessionStorage.setItem('userId', result.id);
                    sessionStorage.setItem('username', result.username);
                    sessionStorage.setItem('nickname', result.nickname);
                    sessionStorage.setItem('role', result.role);
                }

            await dispatch(actions.user.login(result));

            return { success: true };
        }
        else {
            return {  
                success: false,
                message: '로그인에 실패하였습니다. 다시 시도해 주세요.'
            };
        }
    }
}

export const callLogoutAPI = () => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/auth`;

    return async (dispatch, getState) => {
        // 서버 응답을 통해 쿠키 삭제
        const response = await fetch(requestURL, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            localStorage.clear();
            sessionStorage.clear();

            await dispatch(actions.user.logout());
            return { success: true };
        }
        else {
            return {
                success: false,
                message: '로그아웃에 실패하였습니다. 다시 시도해 주세요.'
            };
        }
    }
}

export const callGetCurrentUserAPI = () => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/auth`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (response.ok) {
            const result = await response.json();
            await dispatch(actions.user.getUser(result));
            return { success: true };
        }
        else {
            return {
                success: false,
                message: '회원 정보 조회 중 오류가 발생하였습니다.'
            };
        }
    }
}

export const callUpdateUserAPI = ({ userId, key, value }) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/user/${userId}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                [key]: value
            })
        });

        if (response.ok) {
            await dispatch(actions.user.updateUser({ key, value }));
            return { success: true };
        }
        else {
            return {
                success: false,
                message: '회원 정보 변경 중 오류가 발생하였습니다.'
            };
        }
    }
}

export const callDeleteUserAPI = (userId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/user/${userId}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            localStorage.clear();
            sessionStorage.clear();
            await dispatch(actions.user.logout());
            return { success: true };
        }
        else {
            return {
                success: false,
                message: '회원 탈퇴 중 오류가 발생하였습니다.'
            };
        }
    }
}