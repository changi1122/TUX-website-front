import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import QuillEditor from '../../components/QuillEditor';
import ReferenceRoomRule from '../../components/rule/ReferenceRoomRule';

function ReferenceRoomEdit() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    let { id } = useParams();

    const [post, setPost] = useState(); // 첨부파일 리스트 표시용
    const [loadAgain, setLoadAgain] = useState(false);

    const [category, setCategory] = useState(defaultCategory(searchParams.get('type')));
    const [isCategoryOpened, setIsUserMenuOpened] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [lecture, setLecture] = useState('');
    const [semester, setSemester] = useState('');
    const [professor, setProfessor] = useState('');
    const [isAnonymized, setIsAnonymized] = useState(false);
    const [mountBody, setMountBody] = useState(false); // 리렌더링 용도 state

    // 수정시 이전 내용 로드
    useEffect(() => {
        getReferenceRoom(id);
    }, [])

    useEffect(() => {
        updateFiles(id);
    }, [loadAgain]);

    async function getReferenceRoom(id) {
        const res = await fetch(`/api/referenceroom/${id}`, {
            credentials: 'include'
        });
        const prev = await res.json();
        setCategory(toCategory(prev.category));
        setTitle(prev.title);
        setBody(prev.body);
        setLecture(prev.lecture);
        setSemester(prev.semester);
        setProfessor(prev.professor);
        setIsAnonymized(prev.isAnonymized);
        rerenderBody();
    }

    async function updateFiles(id) {
        const res = await fetch(`/api/referenceroom/${id}`, {
            credentials: 'include'
        });
        setPost(await res.json());
    }

    function rerenderBody() {
        setMountBody(mountBody => !mountBody);
    }

    async function handleFileUpload(e) {
        let data = new FormData();
        data.append('file', e.target.files[0]);

        const res = await fetch(`/api/referenceroom/${id}/file`, {
            method: 'POST',
            credentials: 'include',
            body: data
        });

        if (res.ok) {
            setLoadAgain(!loadAgain);
            e.target.value = '';
        }
        else {
            alert('파일 업로드 중 오류가 발생하였습니다.');
        }
    }

    async function submit(e) {
        e.preventDefault();
        if (!title || !body) {
            alert('제목과 본문을 작성하세요.');
            return;
        }

        const res = await putReferenceRoom(id);

        if (res.ok) {
            navigate(`/referenceroom/${id}`);
        } else {
            alert('글쓰기 중 오류가 발생하였습니다.');
        }
    }
    
    async function putReferenceRoom(id) {
        const res = await fetch(`/api/referenceroom/${id}?type=${category[1]}`, {
            method: "PUT",
            credentials: 'include',
            body: JSON.stringify({
                title, body, lecture, semester, professor, isAnonymized
            }),
            headers: {
                "content-type": "application/json",
            },
        });
        
        return res;
    }

    async function handleDeleteAttachment(filename) {
        if (window.confirm("정말로 첨부파일을 삭제하시겠습니까?")) {
            const res =  await deleteAttachment(id, filename);

            if (res.ok) {
                setLoadAgain(la => !la);
            } else {
                alert('첨부파일 삭제 중 오류가 발생하였습니다.');
            }
        }
    }

    async function deleteAttachment(id, filename) {
        return await fetch(`/api/referenceroom/${id}/file/${filename}`, {
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
                    <div className='w-60 min-w-[15rem] max-lg:hidden'>
                        <ReferenceRoomRule />
                    </div>
                    <div className='flex-1 ml-4 max-lg:ml-0'>
                        {/* 에디터 영역 */}
                        <div style={{ position: 'relative' }}>
                            <button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                                type="button" onClick={() => { setIsUserMenuOpened(!isCategoryOpened) }}>
                            { category[0] }
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg></button>
                            <div style={{ display: (isCategoryOpened) ? 'block' : 'none', position: 'absolute', top: '100%' }} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                        onClick={() => { setCategory(['강의/스터디', 'study']); setIsUserMenuOpened(false) }}>강의/스터디</button>
                                </li>
                                <li>
                                    <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                        onClick={() => { setCategory(['시험 정보', 'exam']); setIsUserMenuOpened(false) }}>시험 정보</button>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <form>
                            <div className="my-4">
                                <input className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                                    type="text" placeholder='제목을 입력하세요' value={title} onChange={(e) => { setTitle(e.target.value) }}/>
                            </div>
                            <div className="my-4">
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    type="text" placeholder='강의 이름' value={lecture} onChange={(e) => { setLecture(e.target.value) }}/>
                            </div>
                            <div className="my-4">
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    type="text" placeholder='수강 학기' value={semester} onChange={(e) => { setSemester(e.target.value) }}/>
                            </div>
                            <div className="my-4">
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    type="text" placeholder='담당 교수' value={professor} onChange={(e) => { setProfessor(e.target.value) }}/>
                            </div>
                            <div className='quill-container bg-white'>
                                <QuillEditor
                                    body={body}
                                    handleQuillChange={setBody}
                                    mountBody={mountBody}
                                    setMountBody={setMountBody}
                                />
                            </div>
                        </form>
                        {
                            post && post.files && post.files.map(f => (
                            <>
                            <div key={f.path} className='block max-w px-6 py-3 mt-3 mb-2 bg-white border border-gray-200 rounded-lg shadow'>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
                                    {(f.isImage) ? '이미지' : '첨부파일'}
                                </span>
                                <a className='text-sm hover:underline' href={f.path} target='_blank' rel="noreferrer">{f.filename}</a>
                            </div>
                            <div className='flex justify-end mb-4'>
                                {
                                    (f.isImage) &&
                                    <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                        onClick={() => window.navigator.clipboard.writeText(f.path)}>
                                        이미지 링크 복사
                                    </button>
                                }
                                <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                    onClick={() => handleDeleteAttachment(f.filename)}>
                                    삭제
                                </button>
                            </div>
                            </>
                            ))
                        }
                        <input className="mt-1 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 inline-block"
                            type='file' onChange={handleFileUpload}/>
                        <div className="flex items-start mb-6 justify-end">
                            <div className="flex items-center h-5">
                            <input id="isAnonymized" type="checkbox" checked={isAnonymized} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required
                                onChange={(e) => { setIsAnonymized(e.target.checked) }}/>
                            </div>
                            <label htmlFor="isAnonymized" className="ml-2 text-sm font-medium text-gray-900">익명으로 올리기</label>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 inline-block"
                                onClick={() => { navigate(-1) }}>
                                취소
                            </button>
                        
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                onClick={submit}>
                                글 수정
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function defaultCategory(type) {
    switch(type) {
        case 'study':
            return ['강의/스터디', 'study'];
        case 'exam':
            return ['시험정보', 'exam'];
        default:
            return ['시험정보', 'exam'];
    }
}

function toCategory(type) {
    switch(type) {
        case 'STUDY':
            return ['강의/스터디', 'study'];
        case 'EXAM':
            return ['시험정보', 'exam'];
        default:
            return ['시험정보', 'exam'];
    }
}


export default ReferenceRoomEdit;