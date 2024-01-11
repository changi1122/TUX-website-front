import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';

import historyDefault from '../../static/default/history.json';
import peopleDefault from '../../static/default/people.json';
import joinFormDefault from '../../static/default/joinForm.md';
import contactFormDefault from '../../static/default/contactForm.md';


function StaticPage() {
    const navigate = useNavigate();

    const [history, setHistory] = useState('');
    const [people, setPeople] = useState('');
    const [joinForm, setJoinForm] = useState('');
    const [contactForm, setContactForm] = useState('');

    async function fetchJoinFormDefault() {
        const res = await fetch(joinFormDefault);
        const form = await res.text();
        setJoinForm(form);
    }
    
    async function fetchContactFormDefault() {
        const res = await fetch(contactFormDefault);
        const form = await res.text();
        setContactForm(form);
    }

    async function postUpdated(name, body) {

        const res = await fetch(`/api/admin/staticpage/${name}`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                name,
                body
            }),
            headers: {
                "content-type": "application/json",
            },
        });
        
        if (res.ok)
            alert("저장하는데 성공하였습니다.");
        else
            alert("저장 도중 오류가 발생하였습니다.");
    }
    
    async function loadPage(name, setState) {
        const res = await fetch(`/api/staticpage/${name}`, { method: "GET" });
        if (res.ok) {
            const page = await res.json();
            setState(decodeURI(page.body));
        }
    }


    useEffect(() => {
        loadPage('history', setHistory);
        loadPage('people', setPeople);
        loadPage('joinForm', setJoinForm);
        loadPage('contactForm', setContactForm);
    }, []);


    return (
        <div className='min-h-screen xl:p-20 px-3 py-10'>
            <div>
                <div className='text-5xl font-black'>페이지 관리</div>
                <div className="text-lg">CBNU TUX</div>
            </div>

            {/* 연혁 관리 */}
            <div className="mt-20 mx-auto xl:w-[70%] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-44 mx-auto text-center">
                        <span className="box-border text-xl">연혁 관리</span>
                    </div>
                </div>

                <form className='mt-8'>
                    <div className="w-full mb-4 border border-gray-200 border-solid rounded-lg bg-gary-50 shadow">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                            <label htmlFor="history" className="sr-only">연혁 관리</label>
                            <textarea id="history" rows="3" className="w-full h-36 px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                                value={history} onChange={(e) => { setHistory(e.target.value) }} placeholder="연혁 페이지에 들어갈 활동과 실적을 입력하세요" required></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 border-solid">
                            <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100"
                                type="button" onClick={() => { setHistory(JSON.stringify(historyDefault, null, 2)) } }>
                                양식으로 초기화
                            </button>
                            <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                                type="button" onClick={() => { postUpdated("history", encodeURI(history)) } }>
                                저장하기
                            </button>
                        </div>
                    </div>
                </form>
                <p className="ms-auto text-xs text-gray-500">형식: JSON</p>
            </div>


            {/* 구성원 소개 관리 */}
            <div className="mt-20 mx-auto xl:w-[70%] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-44 mx-auto text-center">
                        <span className="box-border text-xl">구성원 소개 관리</span>
                    </div>
                </div>

                <form className='mt-8'>
                    <div className="w-full mb-4 border border-gray-200 border-solid rounded-lg bg-gary-50 shadow">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                            <label htmlFor="people" className="sr-only">구성원 소개 관리</label>
                            <textarea id="people" rows="3" className="w-full h-36 px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                                value={people} onChange={(e) => { setPeople(e.target.value) }} placeholder="구성원 소개 페이지에 들어갈 임원 목록을 작성하세요" required></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 border-solid">
                        <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100"
                                type="button" onClick={() => { setPeople(JSON.stringify(peopleDefault, null, 2)) } }>
                                양식으로 초기화
                            </button>
                            <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                                type="button" onClick={() => { postUpdated("people", encodeURI(people)) } }>
                                저장하기
                            </button>
                        </div>
                    </div>
                </form>
                <p className="ms-auto text-xs text-gray-500">형식: JSON</p>
            </div>


            {/* 부원 모집 관리 */}
            <div className="mt-20 mx-auto xl:w-[70%] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-44 mx-auto text-center">
                        <span className="box-border text-xl">부원 모집 관리</span>
                    </div>
                </div>

                <form className='mt-8'>
                    <div className="w-full mb-4 border border-gray-200 border-solid rounded-lg bg-gary-50 shadow">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                            <label htmlFor="joinForm" className="sr-only">부원 모집 관리</label>
                            <textarea id="joinForm" rows="3" className="w-full h-36 px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                                value={joinForm} onChange={(e) => { setJoinForm(e.target.value) }} placeholder="부원 모집 페이지의 내용을 입력하세요" required></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 border-solid">
                            <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100"
                                type="button" onClick={() => { fetchJoinFormDefault() } }>
                                양식으로 초기화
                            </button>
                            <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                                type="button" onClick={() => { postUpdated("joinForm", encodeURI(joinForm)) } }>
                                저장하기
                            </button>
                        </div>
                    </div>
                </form>
                <p className="ms-auto text-xs text-gray-500">형식: MARKDOWN with HTML</p>
            </div>


            {/* 연락처 관리 */}
            <div className="mt-20 mx-auto xl:w-[70%] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-44 mx-auto text-center">
                        <span className="box-border text-xl">연락처 관리</span>
                    </div>
                </div>

                <form className='mt-8'>
                    <div className="w-full mb-4 border border-gray-200 border-solid rounded-lg bg-gary-50 shadow">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                            <label htmlFor="contactForm" className="sr-only">연락처 관리</label>
                            <textarea id="contactForm" rows="3" className="w-full h-36 px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                                value={contactForm} onChange={(e) => { setContactForm(e.target.value) }} placeholder="연락처 페이지 내용을 입력하세요" required></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 border-solid">
                            <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100"
                                type="button" onClick={() => { fetchContactFormDefault() } }>
                                양식으로 초기화
                            </button>
                            <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                                type="button" onClick={() => { postUpdated("contactForm", encodeURI(contactForm)) } }>
                                저장하기
                            </button>
                        </div>
                    </div>
                </form>
                <p className="ms-auto text-xs text-gray-500">형식: MARKDOWN with HTML</p>
            </div>

        </div>
    );
}

export default StaticPage;