import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    isInitialized: false,
    expiresIn: null,
    userId: null,
    username: '',
    nickname: '',
    role: '',
    isLoggedIn: false,

    email: '',
    phoneNumber: '',
    department: '',
    studentNumber: '',
};

/* 액션 */
export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';
export const GET_USER = 'user/GET_USER';
export const SET_USER = 'user/SET_USER';
export const INIT_GUEST = 'user/INIT_GUEST';
export const UPDATE_USER = 'user/UPDATE_USER';

export const actions = createActions({
    [LOGIN]: (payload) => payload,
    [LOGOUT]: () => {},
    [GET_USER]: (payload) => payload,
    [SET_USER]: (payload) => payload,
    [INIT_GUEST]: () => {},
    [UPDATE_USER]: (key, value) => ({ key, value })
});

/* 리듀서 */
const userReducer = handleActions(
    {
        [LOGIN]: (state, { payload }) => (
            {
                isInitialized: true,
                expiresIn: payload.refreshToken.expiresIn,
                userId: payload.user.id,
                username: payload.user.username,
                nickname: payload.user.nickname,
                role: payload.user.role,
                isLoggedIn: true
            }
        ),
        [LOGOUT]: (state) => ({
            ...initialState,
            isInitialized: true
        }),
        [GET_USER]: (state, { payload }) => ({
            ...state,
            isInitialized: true,
            userId: payload.id,
            username: payload.username,
            nickname: payload.nickname,
            role: payload.role,
            isLoggedIn: true,

            email: payload.email,
            phoneNumber: payload.phoneNumber,
            department: payload.department,
            studentNumber: payload.studentNumber,
        }),
        [SET_USER]: (state, { payload }) => ({
            isInitialized: true,
            expiresIn: payload.expiresIn,
            userId: payload.userId,
            username: payload.username,
            nickname: payload.nickname,
            role: payload.role,
            isLoggedIn: true
        }),
        [INIT_GUEST]: (state) => ({
            ...state,
            isInitialized: true,
        }),
        [UPDATE_USER]: (state, { payload }) => ({
            ...state,
            [payload.key]: payload.value
        })
    },
    initialState
)

export default userReducer;