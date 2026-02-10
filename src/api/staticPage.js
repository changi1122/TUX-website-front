import { publicClient } from './client';

export const fetchStaticPage = async (name) => {
    const { data } = await publicClient.get(`/api/staticpage/${name}`);
    return data;
}
