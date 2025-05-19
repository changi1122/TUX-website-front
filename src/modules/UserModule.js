import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    isInitialized: false,
    token: null,
    expiresIn: null,
    userId: null,
    username: null,
    nickname: null,
    role: null,
    isLoggedIn: false
};

/* 액션 */
export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';
export const GET_USER = 'user/GET_USER';
export const SET_USER = 'user/SET_USER';

const actions = createActions({
    [LOGIN]: () => {},
    [LOGOUT]: () => {},
    [GET_USER]: () => {},
    [SET_USER]: (user) => user
});

/* 리듀서 */
const userReducer = handleActions(
    {
        [LOGIN]: (state, { payload }) => (
            {
                isInitialized: true,
                token: payload.token.token,
                expiresIn: payload.token.expiresIn,
                userId: payload.id,
                username: payload.username,
                nickname: payload.nickname,
                role: payload.role,
                isLoggedIn: true
            }
        ),
        [LOGOUT]: (state) => ({ ...initialState, isInitialized: true }),
        [GET_USER]: (state) => ({
            ...state,
            isInitialized: true,
            isLoggedIn: true
        }),
        [SET_USER]: (state, { payload }) => ({
            isInitialized: true,
            token: payload.token,
            expiresIn: payload.expiresIn,
            userId: payload.userId,
            username: payload.username,
            nickname: payload.nickname,
            role: payload.role,
            isLoggedIn: true
        })
    },
    initialState
)

export default userReducer;