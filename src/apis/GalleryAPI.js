import { actions } from '../modules/GalleryModule';

export const callGalleryListAPI = (page, size, query) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/gallery/list?page=${page - 1}&size=${size}&query=${query}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const result = await response.json();
            dispatch(actions.gallery.getGalleryList(result));
            return { success: true };
        } else {
            return {
                success: false,
                message: '갤러리 목록 조회에 실패하였습니다.'
            };
        }
    };
};
