import { LOGIN, LOGOUT } from '../modules/UserModule';

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

            await dispatch({ type: LOGIN, payload: result });

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

            await dispatch({ type: LOGOUT, payload: null });
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