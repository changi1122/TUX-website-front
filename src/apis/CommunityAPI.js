import fetchWrapper from './fetchWrapper';

export const fetchCommunityDetail = async (postId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}`;

    const response = await fetchWrapper(requestURL, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) throw new Error('게시글 조회에 실패하였습니다.');

    const result = await response.json();
    for (const file of result.files) {
        file.path = file.path.replace('[', '%5B').replace(']', '%5D');
    }
    return result;
}

export const deleteCommunity = async (postId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}`;

    const response = await fetchWrapper(requestURL, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) throw new Error('게시글 삭제에 실패하였습니다.');
    return { success: true };
}

export const addCommunityComment = async (postId, comment) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}/comment`;

    const response = await fetchWrapper(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            body : comment
        }),
    });

    if (!response.ok) throw new Error('댓글 작성에 실패하였습니다.');
    return response.json();
}

export const deleteCommunityComment = async (postId, commentId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}/comment/${commentId}`;

    const response = await fetchWrapper(requestURL, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) throw new Error('댓글 삭제에 실패하였습니다.');
    return { success: true };
}

export const postCommunityLike = async (postId, dislike) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}/likes?dislike=${dislike}`;

    const response = await fetchWrapper(requestURL, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) throw new Error(`이미 ${(dislike) ? '비추천' : '추천'}하였습니다.`);
    return { success: true };
}

export const fetchCommunityList = async (category, page, size, query) => {
    let requestURL = '';
    if (category)
        requestURL = `${import.meta.env.VITE_API_URL}/api/community/list/category?${(category) ? 'type='+category+'&' : ''}page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;
    else
        requestURL = `${import.meta.env.VITE_API_URL}/api/community/list?page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;

    const response = await fetchWrapper(requestURL, {
        method: 'GET'
    });

    if (!response.ok) throw new Error('게시글 목록 조회에 실패하였습니다.');
    return response.json();
}

export const fetchMainList = async () => {
    const communityURL = `${import.meta.env.VITE_API_URL}/api/community/list/category?page=0&size=3&type=`;
    const referenceRoomURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/list/category?page=0&size=3&type=`;

    const resNotices = await fetchWrapper(communityURL+'notice', {
        method: 'GET'
    });
    const resContests = await fetchWrapper(communityURL+'contest', {
        method: 'GET'
    });
    const resPosts = await fetchWrapper(communityURL+'free,job,teamrecruitment', {
        method: 'GET'
    });
    const resPhotos = await fetchWrapper(referenceRoomURL+'gallery', {
        method: 'GET'
    });

    const result = {};

    if (resNotices.ok) result.notices = await resNotices.json();
    else throw new Error('메인화면 게시글 목록 조회에 실패하였습니다.');

    if (resContests.ok) result.contests = await resContests.json();
    else throw new Error('메인화면 게시글 목록 조회에 실패하였습니다.');

    if (resPosts.ok) result.posts = await resPosts.json();
    else throw new Error('메인화면 게시글 목록 조회에 실패하였습니다.');

    if (resPhotos.ok) result.photos = await resPhotos.json();
    else throw new Error('메인화면 게시글 목록 조회에 실패하였습니다.');

    return result;
}
