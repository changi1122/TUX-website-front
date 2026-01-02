import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    detail: undefined,
    list: undefined,
    mainNotices: undefined,
    mainContests: undefined,
    mainPosts: undefined,
    mainPhotos: undefined,
};

/* 액션 */
export const GET_COMMUNITY_DETAIL = 'community/GET_COMMUNITY_DETAIL';
export const CLEAN_UP_COMMUNITY_DETAIL = 'community/CLEAN_UP_COMMUNITY_DETAIL';
export const DELETE_COMMUNITY = 'community/DELETE_COMMUNITY';
export const POST_COMMENT = 'community/POST_COMMENT';
export const DELETE_COMMENT = 'community/DELETE_COMMENT';
export const POST_LIKE = 'community/POST_LIKE';
export const GET_COMMUNITY_LIST = 'community/GET_COMMUNITY_LIST';
export const GET_MAIN_POSTS = 'community/GET_MAIN_POSTS';

export const actions = createActions({
    [GET_COMMUNITY_DETAIL]: (payload) => payload,
    [CLEAN_UP_COMMUNITY_DETAIL]: () => {},
    [DELETE_COMMUNITY]: () => {},
    [POST_COMMENT]: (payload) => payload,
    [DELETE_COMMENT]: (payload) => payload,
    [POST_LIKE]: (payload) => payload,
    [GET_COMMUNITY_LIST]: (payload) => payload,
    [GET_MAIN_POSTS]: (payload) => payload,
})

/* 리듀서 */
const communityReducer = handleActions(
    {
        [GET_COMMUNITY_DETAIL]: (state, { payload }) => ({
            ...state,
            detail: payload
        }),
        [CLEAN_UP_COMMUNITY_DETAIL]: (state) => ({
            ...state,
            detail: undefined
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
        }),
        [GET_COMMUNITY_LIST]: (state, { payload }) => ({
            ...state,
            list: payload
        }),
        [GET_MAIN_POSTS]: (state, { payload }) => ({
            ...state,
            mainNotices: payload.notices,
            mainContests: payload.contests,
            mainPosts: payload.posts,
            mainPhotos: payload.photos
        })
    },
    initialState
);

export default communityReducer;