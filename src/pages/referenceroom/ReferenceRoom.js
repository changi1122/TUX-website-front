import { useState } from 'react';
import { useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';

import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
import ReferenceRoomRule from '../../components/rule/ReferenceRoomRule';

function ReferenceRoom() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [posts, setPosts] = useState();
    const [category, setCategory] = useState(defaultCategory(searchParams.get('type')));
    const [isCategoryOpened, setIsUserMenuOpened] = useState(false);
    const [searchQuery, setSearchQuery] = useState((searchParams.get('query')) ? searchParams.get('query') : '');
    const [currentPage, setCurrentPage] = useState((searchParams.get('page')) ? searchParams.get('page') : 1);

    useEffect(() => {
        getReferenceRoomList(category[1], currentPage, 6, searchQuery);
    }, [category, searchQuery, currentPage]);


    async function getReferenceRoomList(category, page, size, query) {
        if (category) {
            const res = await fetch(
                `/api/referenceroom/list/category?${(category) ? 'type='+category+'&' : ''}page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`,
                { credentials: 'include' }
            );
            setPosts(await res.json());
        } else {
            const res = await fetch(`/api/referenceroom/list?page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`);
            setPosts(await res.json());
        }
    } 

    function handleCategorySelect(category) {
        setCategory(defaultCategory(category));
        setSearchParams({ ...searchParams, type: category });
        setIsUserMenuOpened(false);
    }

    function handleSearch(e) {
        e.preventDefault();
        setSearchParams({ ...searchParams, query: searchQuery });
    }

    function handlePageChange(page) {
        setCurrentPage(page);
        setSearchParams({ ...searchParams, page: page });
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
                        {/*사이드바*/}
                        <ReferenceRoomRule />
                    </div>
                    <div className='flex-1 ml-4 max-md:ml-0'>
                        {/* 카테고리/검색 바 */}
                        <form>
                            <div className="flex" style={{ position: 'relative' }}>
                                <button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                                    type="button" onClick={() => { setIsUserMenuOpened(!isCategoryOpened) }}>
                                { category[0] }
                                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg></button>
                                <div style={{ display: (isCategoryOpened) ? 'block' : 'none', position: 'absolute', top: '100%' }} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                            onClick={() => { handleCategorySelect('') }}>전체 글</button>
                                    </li>
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                            onClick={() => { handleCategorySelect('study') }}>강의/스터디</button>
                                    </li>
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                            onClick={() => { handleCategorySelect('exam') }}>시험 정보</button>
                                    </li>
                                    <li>
                                        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                            onClick={() => { handleCategorySelect('gallery') }}>갤러리</button>
                                    </li>
                                    </ul>
                                </div>
                                <div className="relative w-full">
                                    <input value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}
                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="글제목/강의/교수 검색어 입력 또는 카테고리 선택..."/>
                                    <button onClick={handleSearch} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>


                        {/* 게시판 리스트 */}
                        {
                            posts && posts.content.map(p => (
                            <Link key={p.id} to={"/referenceroom/"+p.id} className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                                <span className={badge(p.category)[0] + " text-xs font-medium rounded mr-2 mb-1 px-2.5 py-0.5 inline-block"}>{badge(p.category)[1]}</span>
                                {
                                    p.lecture && 
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                        {p.lecture}
                                    </span>
                                }
                                {
                                    p.semester && 
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                        {p.semester}
                                    </span>
                                }
                                {
                                    p.professor && 
                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                        {p.professor}
                                    </span>
                                }
                                <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900" style={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                                    {p.title}
                                </h3>
                                <div>
                                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>📅</span> {dayjs(p.createdDate).locale('ko').fromNow()}</span>
                                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>🧑🏻‍💻</span> {p.author}</span>
                                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>👀</span> {p.view}</span>
                                </div>
                            </Link>
                        ))}
                        {
                            posts && posts.content.length == 0 &&
                            <div className='text-center py-20'>
                                <p className='text-lg text-gray-500'>조건에 해당하는 게시물이 없습니다.</p>
                            </div>
                        }

                        {/* Pagination/글쓰기 버튼 */}
                        <div className='flex flex-wrap justify-center mt-6 mb-4'>
                            {
                                posts &&
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={posts.pageable.pageNumber + 1}
                                    totalCount={posts.totalElements}
                                    pageSize={6}
                                    onPageChange={handlePageChange}
                                />
                            }
                        </div>
                        <div className='text-right'>
                            {
                                (localStorage.userId || sessionStorage.userId) &&
                                <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 ml-2 mt-2 inline-block"
                                    to='/referenceroom/write'>
                                    글쓰기
                                </Link>
                            }
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
        case 'gallery':
            return ['갤러리', 'gallery'];
        default:
            return ['전체 글', ''];
    }
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

export default ReferenceRoom;