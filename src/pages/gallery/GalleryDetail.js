import { useState } from 'react';
import { useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
import ReferenceRoomRule from '../../components/rule/ReferenceRoomRule';

/* Clone of ReferenceRoomDetail */

function GalleryDetail() {
    const navigate = useNavigate();

    // 글 id
    let { id } = useParams();

    // 현재 로그인된 유저 정보
    const localUserId = localStorage.getItem("userId");
    const sessionUserId = sessionStorage.getItem("userId");
    const localRole = localStorage.getItem("role");
    const sessionRole = sessionStorage.getItem("role");

    const [post, setPost] = useState();
    const [shareLabel, setShareLabel] = useState('공유');
    const [comment, setComment] = useState('');

    useEffect(() => {
        getReferenceRoom(id);
    }, []);

    async function getReferenceRoom(id) {
        const res = await fetch(`/api/referenceroom/${id}`, {
            credentials: 'include'
        });
        setPost(await res.json());
    }

    async function handleDelete()
    {
        if (window.confirm("정말로 글을 삭제하시겠습니까?")) {
            await deleteReferenceRoom(post.id);
            navigate('/referenceroom');
        }
    }

    async function deleteReferenceRoom(id) {
        await fetch(`/api/referenceroom/${id}`, {
            method: "DELETE",
            credentials: 'include'
        });
    }

    async function handlePostComment() {
        if (!(localStorage.getItem('userId') || sessionStorage.getItem('userId'))) {
            alert('댓글을 입력하려면 먼저 로그인하세요.');
            return;
        }
        if (!comment) {
            alert('댓글을 입력하세요.');
            return;
        }

        const res = await postRfComment(post.id, comment);
        if (res.ok) {
            setComment('');
            navigate(0);
        } else {
            alert('댓글 업로드 중 오류가 발생하였습니다.');
        }
    }

    async function postRfComment(id, body) {
        return await fetch(`/api/referenceroom/${id}/comment`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                body
            }),
            headers: {
                "content-type": "application/json",
            },
        });
    }

    async function handleDeleteComment(commentId) {
        if (window.confirm("정말로 댓글을 삭제하시겠습니까?")) {
            const res =  await deleteRfComment(post.id, commentId);

            if (res.ok) {
                navigate(0);
            } else {
                alert('댓글 삭제 중 오류가 발생하였습니다.');
            }
        }
    }

    async function deleteRfComment(id, commentId) {
        return await fetch(`/api/referenceroom/${id}/comment/${commentId}`, {
            method: "DELETE",
            credentials: 'include'
        });
    }


    return (
        <div className='min-h-screen px-3 md:pt-10 md:pb-20 pt-5 pb-10'>
            <div className="border-b border-black w-full md:pb-10 pb-5 ani-fadein-up">
                <div className="text-lg"></div>
                <div className="text-4xl font-bold">자료실</div>
            </div>

            <div className="mt-20 mx-auto lg:w-[936px] w-full text-left">
                <div className='flex'>
                    <div className='w-60 min-w-[15rem] max-md:hidden'>
                        <ReferenceRoomRule />
                    </div>
                    <div className='flex-1 ml-4 max-md:ml-0'>
                        {
                            post &&
                            <>
                            <div className='block max-w px-6 py-6 my-3 bg-white border border-gray-200 rounded-lg shadow'>
                                <span className={badge(post.category)[0] + " text-xs font-medium rounded mr-2 mb-2 px-2.5 py-1 inline-block"}>{badge(post.category)[1]}</span>
                                {
                                    post.lecture && 
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
                                        {post.lecture}
                                    </span>
                                }
                                {
                                    post.semester && 
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
                                        {post.semester}
                                    </span>
                                }
                                {
                                    post.professor && 
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
                                        {post.professor}
                                    </span>
                                }
                                <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900">
                                    {post.title}
                                </h3>
                                <div>
                                    <span className='text-gray-500 text-sm font-medium mr-4' title={
                                        `등록일: ${dayjs(post.createdDate).format("YYYY-MM-DD HH:mm:ss")}` + ((post.editedDate) ?
                                        `\n수정일: ${dayjs(post.editedDate).format("YYYY-MM-DD HH:mm:ss")}` : '')
                                    }>
                                        <span className='inline-block mr-1'>📅</span> {dayjs(post.createdDate).locale('ko').fromNow()}
                                    </span>
                                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>🧑🏻‍💻</span> {post.author}</span>
                                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>👀</span> {post.view}</span>
                                </div>
                                <div className='md mt-4' dangerouslySetInnerHTML={{ __html: post.body }}>
                                </div>
                            </div>
                            {
                                post.files.map(f => (
                                <div key={f.path} className='block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow'>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">첨부파일</span>
                                    <a className='text-sm hover:underline' href={f.path} target='_blank'>{f.filename}</a>
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
                                        (localUserId == post.authorId || sessionUserId == post.authorId) &&
                                        <Link className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                            to={`/gallery/${post.id}/edit`}>
                                            수정
                                        </Link>
                                    }
                                    {
                                        (localUserId == post.authorId || sessionUserId == post.authorId ||
                                            ['MANAGER', 'ADMIN'].includes(localRole) || ['MANAGER', 'ADMIN'].includes(sessionRole)) &&
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
                            {
                                post.comments.map(c => (
                                    <>
                                    <div key={c.id} className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow">
                                        <p className="mb-1 text-sm tracking-tight text-gray-900">
                                            {c.body}
                                        </p>
                                        <div>
                                            <span className='text-gray-500 text-sm font-medium mr-4' title={dayjs(c.createdDate).format("YYYY-MM-DD HH:mm:ss")}>
                                                <span className='inline-block mr-1'>
                                                📅</span> {dayjs(c.createdDate).locale('ko').fromNow()}
                                            </span>
                                            <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>🧑🏻‍💻</span> {c.author}</span>
                                        </div>
                                    </div>
                                    {
                                        (localUserId == c.authorId || sessionUserId == c.authorId) &&
                                        <div className='text-right'>
                                            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                                onClick={() => { handleDeleteComment(c.id) }}>
                                                삭제
                                            </button>
                                        </div>
                                    }
                                    </>
                            ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function badge() {
    return ['bg-yellow-100 text-yellow-800', '갤러리'];
}

export default GalleryDetail;