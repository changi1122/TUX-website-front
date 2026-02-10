import client from './client';

export const fetchCommunityDetail = async (postId) => {
    const { data } = await client.get(`/api/community/${postId}`);
    for (const file of data.files) {
        file.path = file.path.replace('[', '%5B').replace(']', '%5D');
    }
    return data;
}

export const deleteCommunity = async (postId) => {
    await client.delete(`/api/community/${postId}`);
    return { success: true };
}

export const addCommunityComment = async (postId, comment) => {
    const { data } = await client.post(`/api/community/${postId}/comment`, {
        body: comment,
    });
    return data;
}

export const deleteCommunityComment = async (postId, commentId) => {
    await client.delete(`/api/community/${postId}/comment/${commentId}`);
    return { success: true };
}

export const postCommunityLike = async (postId, dislike) => {
    await client.post(`/api/community/${postId}/likes?dislike=${dislike}`);
    return { success: true };
}

export const fetchCommunityList = async (category, page, size, query) => {
    let url = '';
    if (category)
        url = `/api/community/list/category?${(category) ? 'type='+category+'&' : ''}page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;
    else
        url = `/api/community/list?page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;

    const { data } = await client.get(url);
    return data;
}

export const fetchMainList = async () => {
    const communityURL = `/api/community/list/category?page=0&size=3&type=`;
    const referenceRoomURL = `/api/referenceroom/list/category?page=0&size=3&type=`;

    const [resNotices, resContests, resPosts, resPhotos] = await Promise.all([
        client.get(communityURL + 'notice'),
        client.get(communityURL + 'contest'),
        client.get(communityURL + 'free,job,teamrecruitment'),
        client.get(referenceRoomURL + 'gallery'),
    ]);

    return {
        notices: resNotices.data,
        contests: resContests.data,
        posts: resPosts.data,
        photos: resPhotos.data,
    };
}
