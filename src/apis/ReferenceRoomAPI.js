import fetchWrapper from './fetchWrapper';

export const fetchReferenceRoomDetail = async (postId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}`;

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

export const deleteReferenceRoom = async (postId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}`;

    const response = await fetchWrapper(requestURL, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) throw new Error('게시글 삭제에 실패하였습니다.');
    return { success: true };
}

export const addReferenceRoomComment = async (postId, comment) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}/comment`;

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

export const deleteReferenceRoomComment = async (postId, commentId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}/comment/${commentId}`;

    const response = await fetchWrapper(requestURL, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) throw new Error('댓글 삭제에 실패하였습니다.');
    return { success: true };
}

export const postReferenceRoomLike = async (postId, dislike) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}/likes?dislike=${dislike}`;

    const response = await fetchWrapper(requestURL, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) throw new Error(`이미 ${(dislike) ? '비추천' : '추천'}하였습니다.`);
    return { success: true };
}

export const fetchReferenceRoomList = async (category, page, size, query) => {
    let requestURL = '';
    if (category)
        requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/list/category?${(category) ? 'type='+category+'&' : ''}page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;
    else
        requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/list?page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;

    const response = await fetchWrapper(requestURL, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) throw new Error('게시글 목록 조회에 실패하였습니다.');
    return response.json();
}
