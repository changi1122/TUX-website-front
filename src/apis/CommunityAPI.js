import { actions } from '../modules/CommunityModule';

export const callCommunityDetailAPI = (postId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const result = await response.json();
            for (const file of result.files) {
                file.path = file.path.replace('[', '%5B').replace(']', '%5D');
            }
            await dispatch(actions.community.getCommunityDetail(result));
            return { success: true };
        } else {
            return {
                success: false,
                message: '게시글 조회에 실패하였습니다.'
            };
        }
    }
}

export const callCommunityDeleteAPI = (postId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            dispatch(actions.community.deleteCommunity());
            return { success: true };
        } else {
            return {
                success: false,
                message: '게시글 삭제에 실패하였습니다.'
            };
        }
    }
}

export const callCommunityAddCommentAPI = (postId, comment) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}/comment`;

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
            dispatch(actions.community.postComment(result));
            return { success: true };
        } else {
            return {
                success: false,
                message: '댓글 작성에 실패하였습니다.'
            };
        }
    }
}

export const callCommunityDeleteCommentAPI = (postId, commentId) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}/comment/${commentId}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            dispatch(actions.community.deleteComment(commentId));
            return { success: true };
        } else {
            return {
                success: false,
                message: '댓글 삭제에 실패하였습니다.'
            };
        }
    }
}

export const callCommunityPostLikeAPI = (postId, dislike) => {
    const requestURL = `${import.meta.env.VITE_API_URL}/api/community/${postId}/likes?dislike=${dislike}`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            dispatch(actions.community.postLike(dislike));
            return { success: true };
        } else {
            return {
                success: false,
                message: `이미 ${(dislike) ? '비추천' : '추천'}하였습니다.`
            };
        }
    }
}