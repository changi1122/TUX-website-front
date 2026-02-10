import client from './client';

export const fetchGalleryList = async (page, size, query) => {
    const { data } = await client.get(`/api/gallery/list?page=${page - 1}&size=${size}&query=${query}`);
    return data;
};
