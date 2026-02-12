import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';

import CommunityRule from '../../components/rule/CommunityRule';
import CommunityListItem from '../../components/listitem/CommunityListItem';
import CategoryDropdown from '../../components/CategoryDropdown';
import ViewModeToggle from '../../components/ViewModeToggle';
import LoadingIndicator from '../../components/LoadingIndicator';
import useAuthStore from '../../stores/useAuthStore';
import useUIStore from '../../stores/useUIStore';
import { useCommunityList } from '../../queries/useCommunityQueries';
import { COMMUNITY_ALL_CATEGORIES, getDefaultCommunityCategory } from '../../constants/communityCategories';

function Community() {
    const loginUser = useAuthStore();
    const { viewMode, setViewMode } = useUIStore();

    const [searchParams, setSearchParams] = useSearchParams();

    const [category, setCategory] = useState(getDefaultCommunityCategory(searchParams.get('type')));
    const [searchQuery, setSearchQuery] = useState((searchParams.get('query')) ? searchParams.get('query') : '');
    const [currentPage, setCurrentPage] = useState((searchParams.get('page')) ? searchParams.get('page') : 1);

    const pageSize = (viewMode === 'list') ? 10 : 6;
    const { data: posts, isLoading, isError } = useCommunityList(category[1], currentPage, pageSize, searchQuery);

    const handleCategoryClick = (label, value, color) => {
        setCategory([label, value, color]);
        setCurrentPage(1);
        setSearchParams({ ...searchParams, type: value });
    };

    const handleSetViewMode = (mode) => {
        setViewMode(mode);
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
                <div className="text-4xl font-bold max-sm:text-xl">커뮤니티</div>
            </div>

            <div className="mt-5 md:mt-10 mx-auto lg:w-[1044px] w-full text-left">
                <div className='flex'>
                    <div className='w-60 min-w-[15rem] max-lg:hidden'>
                        {/*사이드바*/}
                        <CommunityRule />
                    </div>
                    <div className='flex-1 ml-4 max-lg:ml-0 min-w-0'>
                        {/* 카테고리 */}
                        <div className='flex justify-between items-end mt-8'>
                            <CategoryDropdown
                                categories={COMMUNITY_ALL_CATEGORIES}
                                category={category}
                                onSelect={handleCategoryClick}
                                variant="list"
                            />
                            <ViewModeToggle viewMode={viewMode} onChange={handleSetViewMode} />
                        </div>

                        {/* 게시판 리스트 */}
                        {
                            posts && posts.content.map(p => (
                                <CommunityListItem key={p.id} post={p} viewMode={viewMode} />
                        ))}
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
                                (loginUser.isLoggedIn) &&
                                <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 ml-2 inline-block h-[42px]"
                                    to={`/community/write?type=${category[1]}`}>
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

export default Community;
