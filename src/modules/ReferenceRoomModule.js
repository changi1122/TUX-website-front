import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    detail: undefined,
    list: undefined,
};

/* 액션 */
export const GET_REFERENCE_ROOM_DETAIL = 'referenceRoom/GET_REFERENCE_ROOM_DETAIL';
export const DELETE_REFERENCE_ROOM = 'referenceRoom/DELETE_REFERENCE_ROOM';
export const POST_COMMENT = 'referenceRoom/POST_COMMENT';
export const DELETE_COMMENT = 'referenceRoom/DELETE_COMMENT';
export const POST_LIKE = 'referenceRoom/POST_LIKE';
export const GET_REFERENCE_ROOM_LIST = 'referenceRoom/GET_REFERENCE_ROOM_LIST';

export const actions = createActions({
    [GET_REFERENCE_ROOM_DETAIL]: (payload) => payload,
    [DELETE_REFERENCE_ROOM]: () => {},
    [POST_COMMENT]: (payload) => payload,
    [DELETE_COMMENT]: (payload) => payload,
    [POST_LIKE]: (payload) => payload,
    [GET_REFERENCE_ROOM_LIST]: (payload) => payload,
})

/* 리듀서 */
const referenceRoomReducer = handleActions(
    {
        [GET_REFERENCE_ROOM_DETAIL]: (state, { payload }) => ({
            ...state,
            detail: payload,
        }),
        [DELETE_REFERENCE_ROOM]: (state) => ({
            ...state,
            detail: undefined
        }),
        [POST_COMMENT]: (state, { payload }) => ({
            ...state,
            detail: {
                ...state.detail,
                comments: [...state.detail.comments, payload]
            }
        }),
        [DELETE_COMMENT]: (state, { payload }) => ({
            ...state,
            detail: {
                ...state.detail,
                comments: state.detail.comments.filter(comment => comment.id !== payload)
            }
        }),
        [POST_LIKE]: (state, { payload/* dislike 여부 */ }) => ({
            ...state,
            detail: {
                ...state.detail,
                likes: state.detail.likes + (payload ? 0 : 1),
                dislikes: state.detail.dislikes + (payload ? 1 : 0)
            }
        }),
        [GET_REFERENCE_ROOM_LIST]: (state, { payload }) => ({
            ...state,
            list: payload
        }),
    },
    initialState
);

export default referenceRoomReducer;