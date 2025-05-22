import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    list: undefined,
};

/* 액션 */
export const GET_GALLERY_LIST = 'gallery/GET_GALLERY_LIST';

export const actions = createActions({
    [GET_GALLERY_LIST]: (payload) => payload,
})

/* 리듀서 */
const galleryReducer = handleActions(
    {
        [GET_GALLERY_LIST]: (state, action) => ({
            ...state,
            list: action.payload,
        }),
    },
    initialState
);

export default galleryReducer;