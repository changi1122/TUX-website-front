import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';

import GalleryListItem from '../../components/listitem/GalleryListItem';
import ViewModeToggle from '../../components/ViewModeToggle';
import LoadingIndicator from '../../components/LoadingIndicator';
import useAuthStore from '../../stores/useAuthStore';
import useUIStore from '../../stores/useUIStore';
import { useGalleryList } from '../../queries/useGalleryQueries';

function Gallery() {
    const loginUser = useAuthStore();
    const { galleryViewMode, setGalleryViewMode } = useUIStore();

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchQuery, setSearchQuery] = useState((searchParams.get('query')) ? searchParams.get('query') : '');
    const [currentPage, setCurrentPage] = useState((searchParams.get('page')) ? searchParams.get('page') : 1);

    const pageSize = (galleryViewMode === 'gallery') ? 12 : ((galleryViewMode === 'list') ? 10 : 6);
    const { data: posts, isLoading, isError } = useGalleryList(currentPage, pageSize, searchQuery);

    const handleSetViewMode = (mode) => {
        setGalleryViewMode(mode);
        setCurrentPage(1);
        setSearchParams({ ...searchParams, page: 1 });
    }

    function handleSearch(e) {
        e.preventDefault();
        setCurrentPage(1);
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

            <div className="mt-5 md:mt-10 mx-auto lg:w-[1044px] w-full text-left">
                <div className='flex'>
                    <div className='flex-1 ml-4 max-md:ml-0 min-w-0'>
                        {/* ViewMode */}
                        <ViewModeToggle
                            modes={['gallery', 'list', 'detail']}
                            viewMode={galleryViewMode}
                            onChange={handleSetViewMode}
                        />

                        {/* 게시판 리스트 */}
                        { galleryViewMode === 'gallery' ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                { posts && posts.content.length != 0 && posts.content.map(p => (
                                    <GalleryListItem key={p.id} post={p} viewMode={galleryViewMode} />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4">
                                { posts && posts.content.length != 0 && posts.content.map(p => (
                                    <GalleryListItem key={p.id} post={p} viewMode={galleryViewMode} />
                                ))}
                            </div>
                        )}
                        {
                            posts && posts.content.length == 0 &&
                            <div className='text-center py-20'>
                                <p className='text-lg text-gray-500'>조건에 해당하는 게시물이 없습니다.</p>
                            </div>
                        }
                        { isLoading && <LoadingIndicator /> }
                        { isError && <div className='text-center py-20'><p className='text-lg text-gray-500'>오류가 발생했습니다.</p></div> }

                        {/* 검색 */}
                        <div className='flex justify-between items-end mt-8'>
                            <div className="relative w-full md:max-w-xs flex-1">
                                <input value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}
                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="검색어 입력"/>
                                <button onClick={handleSearch} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span className="sr-only">검색</span>
                                </button>
                            </div>
                            <div className='text-right'>
                            {
                                (['MANAGER', 'ADMIN'].includes(loginUser.role)) &&
                                <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 ml-2 inline-block h-[42px]"
                                    to='/referenceroom/write?type=gallery'>
                                    글쓰기
                                </Link>
                            }
                        </div>
                        </div>

                        {/* Pagination */}
                        <div className='flex flex-wrap justify-center mt-6 mb-4'>
                            {
                                posts &&
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={posts.pageable.pageNumber + 1}
                                    totalCount={posts.totalElements}
                                    pageSize={pageSize}
                                    onPageChange={handlePageChange}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gallery;
