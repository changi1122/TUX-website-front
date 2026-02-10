import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import QuillEditor from '../../components/editor/QuillEditor';
import BlockNoteEditor from '../../components/editor/BlockNoteEditor';
import ReferenceRoomRule from '../../components/rule/ReferenceRoomRule';

const CATEGORIES = [
  { label: '강의/스터디', value: 'study', color: 'rgb(254 226 226)' },
  { label: '시험정보', value: 'exam', color: 'rgb(243 232 255)' },
  { label: '갤러리', value: 'gallery', color: 'rgb(254 249 195)' }
];


function ReferenceRoomWrite() {
    const navigate = useNavigate();
    const loginUser = useAuthStore();
    const [searchParams, _] = useSearchParams();

    const [id, setId] = useState(); // 글 ID : 파일업로드를 통해 글이 임시 생성되었을 경우, ID를 가짐
    const [post, setPost] = useState(); // 첨부파일 리스트 표시용
    const [loadAgain, setLoadAgain] = useState(false);

    const [category, setCategory] = useState(defaultCategory(searchParams.get('type')));
    const [isCategoryOpened, setIsUserMenuOpened] = useState(false);
    const [title, setTitle] = useState('');
    const [editorVersion, setEditorVersion] = useState(2);
    const [body, setBody] = useState('');
    const [lecture, setLecture] = useState('');
    const [semester, setSemester] = useState('');
    const [professor, setProfessor] = useState('');
    const [isAnonymized, setIsAnonymized] = useState(false);
    const [mountBody, setMountBody] = useState(false); // 리렌더링 용도 state

    useEffect(() => {
        if (id) {
            getReferenceRoom(id);
        }
    }, [id, loadAgain]);

    async function getReferenceRoom(id) {
        const res = await fetch(`/api/referenceroom/${id}`, {
            credentials: 'include'
        });
        setPost(await res.json());
    }

    async function handleFileUpload(e) {
        try {
            const url = await uploadFile(e.target.files[0]);
            return url;
        } catch (error) {
            alert(error.message);
        } finally {
            e.target.value = '';
        }
    }

    async function uploadFile(file) {
        const isFirstUpload = !id;
        const url = isFirstUpload 
            ? `/api/referenceroom/file` 
            : `/api/referenceroom/${id}/file`;
        const safeFileName = file.name.replace(/\s+/g, '_');
        const newFile = new File([file], safeFileName, { type: file.type });

        const data = new FormData();
        data.append('file', newFile);
        if (isFirstUpload) {
            data.append('type', category[1]);
        }

        const res = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: data
        });

        if (!res.ok) {
            throw new Error('파일 업로드 중 오류가 발생하였습니다.');
        }

        if (isFirstUpload) {
            const newId = await res.json();
            setId(newId);
            return `/api/referenceroom/${newId}/file/${safeFileName}`;
        } else {
            setLoadAgain(!loadAgain);
            return `/api/referenceroom/${id}/file/${safeFileName}`;
        }
    }

    async function submit(e) {
        e.preventDefault();
        if (!title || !body) {
            alert('제목과 본문을 작성하세요.');
            return;
        }

        let res;
        if (id)
            res = await postReferenceRoomAfterFileUpload(id, category[1]);
        else
            res = await postReferenceRoomWithoutFileUpload(category[1]);

        if (res.ok) {
            navigate("/referenceroom");
        } else {
            alert('글쓰기 중 오류가 발생하였습니다.');
        }
    }

    async function postReferenceRoomWithoutFileUpload(type) {
        const res = await fetch(`/api/referenceroom?type=${type}`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                title,
                body: (typeof body === 'string' ? body : JSON.stringify(body)),
                editorVersion,
                lecture,
                semester,
                professor,
                isAnonymized
            }),
            headers: {
                "content-type": "application/json",
            },
        });
        
        return res;
    }
    
    async function postReferenceRoomAfterFileUpload(id, type) {
        const res = await fetch(`/api/referenceroom/${id}?type=${type}`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                title,
                body: (typeof body === 'string' ? body : JSON.stringify(body)),
                editorVersion,
                lecture,
                semester,
                professor,
                isAnonymized
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

    const handleCategoryClick = (label, value, color) => {
        setCategory([label, value, color]);
        setIsUserMenuOpened(false);
    };


    return (
        <div className='min-h-screen px-3 md:pt-10 md:pb-20 pt-5 pb-10'>
            <div className="border-b border-black w-full md:pb-10 pb-5 ani-fadein-up">
                <div className="text-lg"></div>
                <div className="text-4xl font-bold max-sm:text-xl">
                    {(category[1] === 'gallery') && '갤러리' }
                    {(category[1] !== 'gallery') && '자료실' }
                </div>
            </div>

            <div className="mt-5 md:mt-10 mx-auto lg:w-[1044px] w-full text-left">
                <div className='flex'>
                    <div className='w-60 min-w-[15rem] max-lg:hidden'>
                        <ReferenceRoomRule />
                    </div>
                    <div className='flex-1 ml-4 max-lg:ml-0 lg:max-w-[788px] max-w-full'>
                        {/* 에디터 영역 */}
                        <div style={{ position: 'relative' }}>
                            <button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                                type="button" onClick={() => { setIsUserMenuOpened(!isCategoryOpened) }}>
                            <span className='w-2 h-[16px] mr-2 rounded-full' style={{ backgroundColor: `${category[2]}` }}></span>{ category[0] }
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg></button>
                            <div style={{ display: (isCategoryOpened) ? 'block' : 'none', position: 'absolute', top: '100%' }} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                                {CATEGORIES.filter(cat => (cat.value !== 'gallery' || ['MANAGER', 'ADMIN'].includes(loginUser.role)))
                                    .map((cat) => (
                                    <li key={cat.value}>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                        onClick={() => handleCategoryClick(cat.label, cat.value, cat.color)}
                                    >
                                        <span className='w-2 mr-2 rounded-full' style={{ backgroundColor: `${cat.color}` }}></span>
                                        {cat.label}
                                    </button>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <form>
                            <div className="mt-4">
                                <input className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                                    type="text" placeholder='제목을 입력하세요' value={title} onChange={(e) => { setTitle(e.target.value) }}/>
                            </div>
                            <div className='md:flex md:gap-x-2'>
                                <div className="my-4 flex-1">
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        type="text" placeholder={category[1] === 'gallery' ? '촬영 장소 (선택)' : '강의 이름'} value={lecture} onChange={(e) => { setLecture(e.target.value) }}/>
                                </div>
                                <div className="my-4 flex-1">
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        type="text" placeholder={category[1] === 'gallery' ? '촬영 일자 (선택)' : '수강 학기'} value={semester} onChange={(e) => { setSemester(e.target.value) }}/>
                                </div>
                                <div className="my-4 flex-1">
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        type="text" placeholder={category[1] === 'gallery' ? '기타 (선택)' : '담당 교수'} value={professor} onChange={(e) => { setProfessor(e.target.value) }}/>
                                </div>
                            </div>
                            <div className="inline-flex rounded-md shadow-xs mb-2" role="group">
                                <button
                                    type="button"
                                    className={`px-4 py-2 text-sm font-medium border rounded-s-lg
                                    ${
                                        editorVersion === 2
                                        ? "bg-gray-700 text-white border-gray-900"
                                        : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                                    }`}
                                    onClick={() => setEditorVersion(2)}
                                >
                                    블록 에디터
                                </button>
                                <button
                                    type="button"
                                    className={`px-4 py-2 text-sm font-medium border rounded-e-lg
                                    ${
                                        editorVersion === 1
                                        ? "bg-gray-700 text-white border-gray-900"
                                        : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                                    }`}
                                    onClick={() => setEditorVersion(1)}
                                >
                                    클래식 에디터
                                </button>
                            </div>
                            {editorVersion === 2 && (
                                <div className='blocknote-container' spellCheck="false">
                                    <BlockNoteEditor
                                        editable={true}
                                        body={body}
                                        onChange={setBody}
                                        uploadFile={uploadFile}
                                    />
                                </div>
                            )}
                            {editorVersion === 1 && (
                                <div className='quill-container bg-white'>
                                    <QuillEditor
                                        body={body}
                                        handleQuillChange={setBody}
                                        mountBody={mountBody}
                                        setMountBody={setMountBody}
                                    />
                                </div>
                            )}
                        </form>
                        {
                            post && post.files && post.files.map(f => (
                                <>
                                <div key={f.path} className='flex items-center max-w px-6 py-3 mt-3 mb-2 bg-white border border-gray-200 rounded-lg shadow'>
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
                                        {(f.isImage) ? '이미지' : '첨부파일'}
                                    </span>
                                    <a className='flex-1 text-sm hover:underline' href={f.path + "?aid=" + f.id} target='_blank' rel="noreferrer">{f.filename}</a>
                                    <span className='ml-2 text-sm text-gray-500'>
                                        <svg className="inline w-[14px] h-[14px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                                            <path stroke='#727272' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
                                        </svg>
                                        <span className='ml-1'>{f.downloadCount+"회"}</span>
                                    </span>
                                </div>
                                <div className='flex justify-end mb-4'>
                                    {
                                        (f.isImage) &&
                                        <>
                                        { editorVersion === 1 && (
                                            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                                onClick={() => { Window.insertImage(f.path) }}>
                                                이미지 본문 삽입
                                            </button>
                                        )}
                                        <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                            onClick={() => window.navigator.clipboard.writeText(f.path)}>
                                            링크 복사
                                        </button>
                                        </>
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
                        <div className="flex items-start mt-4 mb-6 justify-end">
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
                                글쓰기
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
            return ['강의/스터디', 'study', 'rgb(254 226 226)'];
        case 'exam':
            return ['시험정보', 'exam', 'rgb(243 232 255)'];
        case 'gallery':
            return ['갤러리', 'gallery', 'rgb(254 249 195)'];
        default:
            return ['시험정보', 'exam', 'rgb(243 232 255)'];
    }
}

export default ReferenceRoomWrite;