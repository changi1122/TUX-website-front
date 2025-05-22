import { actions } from '../modules/ReferenceRoomModule';

export const callReferenceRoomDetailAPI = (postId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const result = await response.json();
            for (const file of result.files) {
                file.path = file.path.replace('[', '%5B').replace(']', '%5D');
            }
            await dispatch(actions.referenceRoom.getReferenceRoomDetail(result));
            return { success: true };
        } else {
            return {
                success: false,
                message: '게시글 조회에 실패하였습니다.'
            };
        }
    }
}

export const callReferenceRoomDeleteAPI = (postId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            dispatch(actions.referenceRoom.deleteReferenceRoom());
            return { success: true };
        } else {
            return {
                success: false,
                message: '게시글 삭제에 실패하였습니다.'
            };
        }
    }
}

export const callReferenceRoomAddCommentAPI = (postId, comment) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}/comment`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                body : comment
            }),
        });

        if (response.ok) {
            const result = await response.json();
            await dispatch(actions.referenceRoom.postComment(result));
            return { success: true };
        } else {
            return {
                success: false,
                message: '댓글 작성에 실패하였습니다.'
            };
        }
    }
}

export const callReferenceRoomDeleteCommentAPI = (postId, commentId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}/comment/${commentId}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            await dispatch(actions.referenceRoom.deleteComment(commentId));
            return { success: true };
        } else {
            return {
                success: false,
                message: '댓글 삭제에 실패하였습니다.'
            };
        }
    }
}

export const callReferenceRoomPostLikeAPI = (postId, dislike) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/${postId}/likes?dislike=${dislike}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            await dispatch(actions.referenceRoom.postLike(dislike));
            return { success: true };
        } else {
            return {
                success: false,
                message: `이미 ${(dislike) ? '비추천' : '추천'}하였습니다.`
            };
        }
    }
}

export const callReferenceRoomListAPI = (category, page, size, query) => {
    let requestURL = '';
    if (category)
        requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/list/category?${(category) ? 'type='+category+'&' : ''}page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;
    else
        requestURL = `${import.meta.env.VITE_API_URL}/api/referenceroom/list?page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const result = await response.json();
            dispatch(actions.referenceRoom.getReferenceRoomList(result));
            return { success: true };
        } else {
            return {
                success: false,
                message: '게시글 목록 조회에 실패하였습니다.'
            };
        }
    }
}