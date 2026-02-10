import client from './client';

export const fetchReferenceRoomDetail = async (postId) => {
    const { data } = await client.get(`/api/referenceroom/${postId}`);
    for (const file of data.files) {
        file.path = file.path.replace('[', '%5B').replace(']', '%5D');
    }
    return data;
}

export const deleteReferenceRoom = async (postId) => {
    await client.delete(`/api/referenceroom/${postId}`);
    return { success: true };
}

export const addReferenceRoomComment = async (postId, comment) => {
    const { data } = await client.post(`/api/referenceroom/${postId}/comment`, {
        body: comment,
    });
    return data;
}

export const deleteReferenceRoomComment = async (postId, commentId) => {
    await client.delete(`/api/referenceroom/${postId}/comment/${commentId}`);
    return { success: true };
}

export const postReferenceRoomLike = async (postId, dislike) => {
    await client.post(`/api/referenceroom/${postId}/likes?dislike=${dislike}`);
    return { success: true };
}

export const fetchReferenceRoomList = async (category, page, size, query) => {
    let url = '';
    if (category)
        url = `/api/referenceroom/list/category?${(category) ? 'type='+category+'&' : ''}page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;
    else
        url = `/api/referenceroom/list?page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;

    const { data } = await client.get(url);
    return data;
}

export const createReferenceRoom = async (type, body) => {
    const { data } = await client.post(`/api/referenceroom?type=${type}`, body);
    return data;
}

export const createReferenceRoomWithFile = async (postId, type, body) => {
    const { data } = await client.post(`/api/referenceroom/${postId}?type=${type}`, body);
    return data;
}

export const updateReferenceRoom = async (postId, type, body) => {
    const { data } = await client.put(`/api/referenceroom/${postId}?type=${type}`, body);
    return data;
}

export const uploadReferenceRoomFileInit = async (formData) => {
    const { data } = await client.post('/api/referenceroom/file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
}

export const uploadReferenceRoomFile = async (postId, formData) => {
    await client.post(`/api/referenceroom/${postId}/file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export const deleteReferenceRoomFile = async (postId, filename) => {
    await client.delete(`/api/referenceroom/${postId}/file/${filename}`);
}
