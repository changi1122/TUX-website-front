import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import ReferenceRoomRule from '../../components/rule/ReferenceRoomRule';
import BlockNoteEditor from '../../components/editor/BlockNoteEditor';
import useAuthStore from '../../stores/useAuthStore';
import {
    useReferenceRoomDetail,
    useReferenceRoomDelete,
    useReferenceRoomAddComment,
    useReferenceRoomDeleteComment,
    useReferenceRoomLike,
} from '../../queries/useReferenceRoomQueries';
import { getApiErrorMessage } from '../../api/client';

function ReferenceRoomDetail() {
    const navigate = useNavigate();

    const loginUser = useAuthStore();

    // 글 id
    let { id } = useParams();

    const { data: post } = useReferenceRoomDetail(id);
    const deleteMutation = useReferenceRoomDelete();
    const addCommentMutation = useReferenceRoomAddComment();
    const deleteCommentMutation = useReferenceRoomDeleteComment();
    const likeMutation = useReferenceRoomLike();

    const [shareLabel, setShareLabel] = useState('공유');
    const [comment, setComment] = useState('');

    const parsedBody = useMemo(() => {
        try {
            // JSON 문자열이면 파싱하고, HTML 문자열이면 그대로 반환
            if (post && post.editorVersion && post.editorVersion >= 2 && post.body)
                return JSON.parse(post.body);
        } catch (error) {
            console.error("BlockNote data parse error:", error);
            return undefined;
        }
    }, [post]);

    async function handleDelete()
    {
        if (window.confirm("정말로 글을 삭제하시겠습니까?")) {
            try {
                await deleteMutation.mutateAsync(post.id);
                navigate('/referenceroom');
            } catch (error) {
                alert(getApiErrorMessage(error));
            }
        }
    }

    /* 댓글 */
    async function handlePostComment(e) {
        e.preventDefault();

        if (!loginUser.isLoggedIn) {
            alert('댓글을 입력하려면 먼저 로그인하세요.');
            return;
        }
        if (!comment) {
            alert('댓글을 입력하세요.');
            return;
        }

        try {
            await addCommentMutation.mutateAsync({ postId: id, comment });
            setComment('');
        } catch (error) {
            alert(getApiErrorMessage(error));
        }
    }

    async function handleDeleteComment(commentId) {
        if (window.confirm("정말로 댓글을 삭제하시겠습니까?")) {
            try {
                await deleteCommentMutation.mutateAsync({ postId: id, commentId });
            } catch (error) {
                alert(getApiErrorMessage(error));
            }
        }
    }

    /* 추천 비추천 */
    async function handleLikeDislike(dislike) {
        if (!loginUser.isLoggedIn) {
            alert('추천/비추천하려면 먼저 로그인하세요.');
            return;
        }

        try {
            await likeMutation.mutateAsync({ postId: id, dislike });
        } catch (error) {
            alert(getApiErrorMessage(error));
        }
    }


    return (
        <div className='min-h-screen px-3 md:pt-10 md:pb-20 pt-5 pb-10'>
            <div className="border-b border-black w-full md:pb-10 pb-5 ani-fadein-up">
                <div className="text-lg"></div>
                <div className="text-4xl font-bold max-sm:text-xl">
                    {(post && post.category === 'GALLERY') && '갤러리' }
                    {(post && post.category !== 'GALLERY') && '자료실' }
                </div>
            </div>

            <div className="mt-5 md:mt-10 mx-auto lg:w-[1044px] w-full text-left">
                <div className='flex'>
                    <div className='w-60 min-w-[15rem] max-lg:hidden'>
                        <ReferenceRoomRule />
                    </div>
                    <div className='flex-1 ml-4 max-lg:ml-0 lg:max-w-[788px] max-w-full'>
                        {
                            post &&
                            <>
                            <div className='block max-w px-6 py-6 my-3 bg-white border border-gray-200 rounded-lg shadow'>
                                <span className={badge(post.category)[0] + " text-xs font-medium rounded mr-2 mb-2 px-2.5 py-1 inline-block align-text-top"}>{badge(post.category)[1]}</span>
                                {
                                    post.lecture &&
                                    <span className="inline-block max-w-[160px] overflow-hidden text-ellipsis align-text-top mb-2
                                                    bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded whitespace-nowrap">
                                        {post.lecture}
                                    </span>
                                }
                                {
                                    post.semester &&
                                    <span className="inline-block max-w-[160px] overflow-hidden text-ellipsis align-text-top mb-2
                                                    bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded whitespace-nowrap">
                                        {post.semester}
                                    </span>
                                }
                                {
                                    post.professor &&
                                    <span className="inline-block max-w-[160px] overflow-hidden text-ellipsis align-text-top mb-2
                                                    bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded whitespace-nowrap">
                                        {post.professor}
                                    </span>
                                }
                                <h3 className="my-1 text-xl font-bold tracking-tight text-gray-900">
                                    {post.title}
                                </h3>
                                <div>
                                    <span className='text-gray-500 text-xs font-medium mr-4' title={
                                        `등록일: ${dayjs(post.createdDate).format("YYYY-MM-DD HH:mm:ss")}` + ((post.editedDate) ?
                                        `\n수정일: ${dayjs(post.editedDate).format("YYYY-MM-DD HH:mm:ss")}` : '')
                                    }>
                                        <span className='inline-block mr-1'>📅</span> {dayjs(post.createdDate).locale('ko').fromNow()}
                                    </span>
                                    <span className='text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>🧑🏻‍💻</span> {post.author}</span>
                                    <span className='text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>👀</span> {post.view}</span>
                                    <span className='text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>👍</span> {post.likes}</span>
                                </div>
                                { post && post.editorVersion && post.editorVersion >= 2 && (
                                    <div className='blocknote-viewer mt-4 break-words'>
                                        <BlockNoteEditor editable={false} body={parsedBody} key={post?.editedDate}/>
                                    </div>
                                )}
                                { !(post && post.editorVersion && post.editorVersion >= 2) && (
                                    <div className='md mt-4 ql-editor break-words' style={{ padding: '0' }}
                                        dangerouslySetInnerHTML={{ __html: post.body }}>
                                    </div>
                                )}
                                <div className="flex rounded-md justify-center mt-12 mb-4" role="group">
                                    <button type="button" className="w-24 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100
                                                                hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:text-blue-600 text-blue-600"
                                            onClick={() => handleLikeDislike(false)}>
                                        <p>{post.likes}</p>
                                        <p className='text-xs'>👍추천</p>
                                    </button>
                                    <button type="button" className="w-24 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100
                                                                hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:text-red-600 text-red-600"
                                            onClick={() => handleLikeDislike(true)}>
                                        <p>{post.dislikes * -1}</p>
                                        <p className='text-xs'>👎비추천</p>
                                    </button>
                                </div>
                                {
                                    post.likedPeople && post.likedPeople.length > 0 &&
                                    <div className='text-xs mb-2 text-gray-400'>
                                        추천 : {post.likedPeople.join(', ')}
                                    </div>
                                }
                            </div>
                            {
                                post.files.map(f => (
                                <div key={f.path} className='flex items-center max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow'>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
                                        {(f.isImage) ? '이미지' : '첨부파일'}
                                    </span>
                                    <a className='flex-1 text-sm hover:underline break-all' href={f.path + "?aid=" + f.id} target='_blank' rel="noreferrer">{f.filename}</a>
                                    <span className='ml-2 text-sm text-gray-500'>
                                        <svg className="inline w-[14px] h-[14px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                                            <path stroke='#727272' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
                                        </svg>
                                        <span className='ml-1'>{f.downloadCount+"회"}</span>
                                    </span>
                                </div>
                                ))
                            }
                            <div className='flex justify-between mt-4'>
                                <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 inline-block"
                                    onClick={() => { navigate(-1) }}>
                                    돌아가기
                                </button>
                                <div>
                                    <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                        onClick={() => { window.navigator.clipboard.writeText(window.location.href); setShareLabel("링크 복사됨!") }}>
                                        {shareLabel}
                                    </button>
                                    {
                                        (loginUser.userId == post.authorId || ['ADMIN'].includes(loginUser.role)) &&
                                        <Link className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                            to={`/referenceroom/${post.id}/edit?ev=${post.editorVersion || 1}`}>
                                            수정
                                        </Link>
                                    }
                                    {
                                        (loginUser.userId == post.authorId || ['MANAGER', 'ADMIN'].includes(loginUser.role)) &&
                                        <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                            onClick={handleDelete}>
                                            삭제
                                        </button>
                                    }
                                </div>
                            </div>
                            {/* 댓글 */}
                            <p className='mt-8 ml-2'>
                                댓글 {post.comments.length}개
                            </p>
                            {
                                post.comments.map(c => (
                                    <React.Fragment key={c.id}>
                                    <div className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow break-words">
                                        <p className="mb-1 text-sm tracking-tight text-gray-900">
                                            {c.body}
                                        </p>
                                        <div>
                                            <span className='text-gray-500 text-xs font-medium mr-4' title={dayjs(c.createdDate).format("YYYY-MM-DD HH:mm:ss")}>
                                                <span className='inline-block mr-1'>
                                                📅</span> {dayjs(c.createdDate).locale('ko').fromNow()}
                                            </span>
                                            <span className='text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>🧑🏻‍💻</span> {c.author}</span>
                                        </div>
                                    </div>
                                    {
                                        (loginUser.userId == c.authorId) &&
                                        <div className='text-right'>
                                            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                                onClick={() => { handleDeleteComment(c.id) }}>
                                                삭제
                                            </button>
                                        </div>
                                    }
                                    </React.Fragment>
                            ))}
                            <form className='mt-3'>
                                <div className="w-full mb-4 border border-gray-200 border-solid rounded-lg bg-gary-50 shadow">
                                    <div className="px-4 py-2 bg-white rounded-t-lg">
                                        <label htmlFor="comment" className="sr-only">댓글 </label>
                                        <textarea id="comment" rows="3" className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                                            value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="댓글을 입력하세요" required></textarea>
                                    </div>
                                    <div className="flex items-center justify-end px-3 py-2 border-t border-gray-200 border-solid">
                                        <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                                            type="submit" onClick={handlePostComment}>
                                            댓글 달기
                                        </button>
                                        <div className="flex pl-0 space-x-1 sm:pl-2">
                                        </div>
                                    </div>
                                </div>
                            </form>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function badge(category) {
    switch(category) {
        case 'STUDY':
            return ['bg-red-100 text-red-800', '강의/스터디'];
        case 'GALLERY':
            return ['bg-yellow-100 text-yellow-800', '갤러리'];
        default:
            return ['bg-purple-100 text-purple-800', '시험정보'];
    }
}

export default ReferenceRoomDetail;
