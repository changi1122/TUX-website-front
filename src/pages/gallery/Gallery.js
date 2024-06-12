import { useState } from 'react';
import { useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import LoadingIndicator from '../../components/LoadingIndicator';

function Gallery() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [posts, setPosts] = useState();
    const [searchQuery, setSearchQuery] = useState((searchParams.get('query')) ? searchParams.get('query') : '');
    const [currentPage, setCurrentPage] = useState((searchParams.get('page')) ? searchParams.get('page') : 1);

    useEffect(() => {
        getGalleryList(currentPage, 12, searchQuery);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        getGalleryList(currentPage, 12, searchQuery);
    }, [searchQuery]);

    async function getGalleryList(page, size, query) {
        const res = await fetch(`/api/gallery/list?&page=${page - 1}&size=${size}&${(query) ? "&query="+query : ''}`);
        setPosts(await res.json());
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
                <div className="text-4xl font-bold max-sm:text-xl">갤러리</div>
            </div>

            <div className="mt-5 md:mt-10 mx-auto lg:w-[936px] w-full text-left">
                <div className='flex'>
                    <div className='flex-1 ml-4 max-md:ml-0'>
                        {/* 카테고리/검색 바 */}
                        <form className='block text-right'>
                            <div className="inline-flex max-w-xs w-full" style={{ position: 'relative' }}>
                                <div className="relative w-full">
                                    <input value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}
                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="검색어 입력..."/>
                                    <button onClick={handleSearch} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">검색</span>
                                    </button>
                                </div>
                            </div>
                        </form>


                        {/* 게시판 리스트 */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                            {
                                posts && posts.content.length != 0 && posts.content.map(p => (
                                    <Link key={p.id} to={"/gallery/"+p.id}>
                                        <div className='gallery-item relative'>
                                            
                                            <img className="h-[200px] w-full max-w-full rounded-lg object-cover" src={(p.mainImage) ? p.mainImage.path : '/images/noimage.jpg'} alt=""/>
                                            <div className='text-background w-full text-sm text-white absolute bottom-0 px-1 py-2 rounded-lg overflow-hidden text-ellipsis'>
                                                {p.title}
                                            </div>
                                        </div>
                                    </Link>
                            ))}
                        </div>
                        {
                            posts && posts.content.length == 0 &&
                            <div className='text-center py-20'>
                                <p className='text-lg text-gray-500'>조건에 해당하는 게시물이 없습니다.</p>
                            </div>
                        }
                        { !posts && <LoadingIndicator /> }

                        {/* Pagination/글쓰기 버튼 */}
                        <div className='flex flex-wrap justify-center mt-6 mb-4'>
                            {
                                posts &&
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={posts.pageable.pageNumber + 1}
                                    totalCount={posts.totalElements}
                                    pageSize={12}
                                    onPageChange={handlePageChange}
                                />
                            }
                        </div>
                        <div className='text-right'>
                            {
                                (isManagerOrAdmin()) &&
                                <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 ml-2 mt-2 inline-block"
                                    to='/gallery/write'>
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

function isManagerOrAdmin() {
    return (localStorage.role === 'MANAGER' || sessionStorage.role === 'MANAGER' ||
            localStorage.role === 'ADMIN' || sessionStorage.role === 'ADMIN');
}

export default Gallery;