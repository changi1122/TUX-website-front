import client from './client';
import { publicClient } from './client';

export const fetchWaitingList = async () => {
    const { data } = await client.get('/api/admin/user/waiting');
    return data;
}

export const fetchMemberList = async () => {
    const { data } = await client.get('/api/admin/user/member');
    return data;
}

export const changeUserRole = async (userId, role) => {
    await client.post(`/api/admin/user/${userId}/role/${role}`);
}

export const changeUserPassword = async (userId, password) => {
    await client.put(`/api/admin/user/${userId}/password`, password, {
        headers: { 'Content-Type': 'text/plain' }
    });
}

export const banUser = async (userId) => {
    await client.delete(`/api/admin/user/${userId}/ban`);
}

export const fetchBannerList = async () => {
    const { data } = await publicClient.get('/api/banner');
    return data;
}

export const deleteBanner = async (filename) => {
    await client.delete(`/api/admin/banner/${filename}`);
}

export const uploadBanner = async (formData) => {
    await client.post('/api/admin/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export const updateStaticPage = async (name, body) => {
    await client.post(`/api/admin/staticpage/${name}`, { name, body });
}
