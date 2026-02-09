import fetchWrapper from './fetchWrapper';

export const fetchGalleryList = async (page, size, query) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/gallery/list?page=${page - 1}&size=${size}&query=${query}`;

    const response = await fetchWrapper(requestURL, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) throw new Error('갤러리 목록 조회에 실패하였습니다.');
    return response.json();
};
