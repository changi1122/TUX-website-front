import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    detail: undefined,
};

/* 액션 */
export const GET_COMMUNITY_DETAIL = 'community/GET_COMMUNITY_DETAIL';
export const DELETE_COMMUNITY = 'community/DELETE_COMMUNITY';
export const POST_COMMENT = 'community/POST_COMMENT';
export const DELETE_COMMENT = 'community/DELETE_COMMENT';
export const POST_LIKE = 'community/POST_LIKE';

export const actions = createActions({
    [GET_COMMUNITY_DETAIL]: (payload) => payload,
    [DELETE_COMMUNITY]: () => {},
    [POST_COMMENT]: (payload) => payload,
    [DELETE_COMMENT]: (payload) => payload,
    [POST_LIKE]: (payload) => payload,
})

/* 리듀서 */
const communityReducer = handleActions(
    {
        [GET_COMMUNITY_DETAIL]: (state, { payload }) => ({
            ...state,
            detail: payload
        }),
        [DELETE_COMMUNITY]: (state) => ({
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
        })
    },
    initialState
);

export default communityReducer;