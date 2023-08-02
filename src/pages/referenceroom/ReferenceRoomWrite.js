import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import QuillEditor from '../../components/QuillEditor';
import ReferenceRoomRule from '../../components/rule/ReferenceRoomRule';

function ReferenceRoomWrite() {
    const navigate = useNavigate();

    const [id, setId] = useState(); // 글 ID : 파일업로드를 통해 글이 임시 생성되었을 경우, ID를 가짐
    const [post, setPost] = useState();
    const [loadAgain, setLoadAgain] = useState(false);

    const [category, setCategory] = useState(['시험 정보', 'exam']);
    const [isCategoryOpened, setIsUserMenuOpened] = useState(false);
    const [title, setTitle] = useState('');
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
        if (!id) { // 첫 업로드
            let data = new FormData();
            data.append('type', category[1]);
            data.append('file', e.target.files[0]);

            const res = await fetch(`/api/referenceroom/file`, {
                method: 'POST',
                credentials: 'include',
                body: data
            })

            if (res.ok) {
                setId(await res.json());
                e.target.value = '';
            }
            else {
                alert('파일 업로드 중 오류가 발생하였습니다.');
            }
        }
        else {
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
    }

    async function submit(e) {
        e.preventDefault();
        if (!title || !body) {
            alert('제목과 본문을 작성하세요.');
            return;
        }

        let res;
        if (id)
            res = await postReferenceRoomAfterFileUpload(id);
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
                title, body, lecture, semester, professor, isAnonymized
            }),
            headers: {
                "content-type": "application/json",
            },
        });
        
        return res;
    }
    
    async function postReferenceRoomAfterFileUpload(id) {
        const res = await fetch(`/api/referenceroom/${id}`, {
            method: "POST",
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


    return (
        <div className='min-h-screen px-3 md:pt-10 md:pb-20 pt-5 pb-10'>
            <div className="border-b border-black w-full md:pb-10 pb-5 ani-fadein-up">
                <div className="text-lg"></div>
                <div className="text-4xl font-bold">자료실</div>
            </div>

            <div className="mt-20 mx-auto lg:w-[936px] w-full text-left">
                <div className='flex'>
                    <div className='w-60 max-md:hidden'>
                        <ReferenceRoomRule />
                    </div>
                    <div className='flex-1 ml-4 max-md:ml-0'>
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
                            <div key={f.path} className='block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow'>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">첨부파일</span>
                                <a className='text-sm hover:underline' href={f.path} target='_blank'>{f.filename}</a>
                            </div>
                            ))
                        }
                        <input className="mt-1 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 mr-2 inline-block"
                            type='file' onChange={handleFileUpload}/>
                        <div className="flex items-start mb-6 justify-end">
                            <div className="flex items-center h-5">
                            <input id="isAnonymized" type="checkbox" value={isAnonymized} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required
                                onChange={(e) => { setIsAnonymized(e.target.checked) }}/>
                            </div>
                            <label for="isAnonymized" className="ml-2 text-sm font-medium text-gray-900">익명으로 올리기</label>
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

export default ReferenceRoomWrite;