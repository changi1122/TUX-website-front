import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Sw.css'

import LoadingIndicator from '../components/LoadingIndicator';

import MainListItem from '../components/listitem/MainListItem';

const Main = () => {

  const [banners, setBanners] = useState(['01.jpg']) // 배너 이미지 목록 (동적으로 가져옴)

  const [notices, setNotices] = useState();   // 최근 공지사항
  const [contests, setContests] = useState(); // 최근 대회/공모전 정보
  const [posts, setPosts] = useState();       // 최근 커뮤니티(자유게시판, 채용/취업, 팀원 모집)
  const [photos, setPhotos] = useState();     // 최근 갤러리

  useEffect(() => {
    getBanners(setBanners);
    getPosts("notice", setNotices);
    getPosts("contest", setContests);
    getPosts("free,job,teamrecruitment", setPosts);
    getPostsFromReferenceRoom("gallery", setPhotos);
  }, []);

  async function getBanners(setCallback) {
    const res = await fetch('/api/banner');
    setCallback(await res.json());
  }

  async function getPosts(category, setCallback) {
    const res = await fetch(
        `/api/community/list/category?type=${category}&page=0&size=3`
    );
    setCallback(await res.json());
  }

  async function getPostsFromReferenceRoom(category, setCallback) {
    const res = await fetch(
        `/api/referenceroom/list/category?type=${category}&page=0&size=3`
    );
    setCallback(await res.json());
  }

  /* 홈화면 네비게이션 버튼 컴포넌트 */
  const NavLink = ({ href, text, color, children }) => {
    return (
      <a href={href} className='inline-flex flex-col items-center'>
        <span className={`text-${color}-700 border border-gray-300 hover:ring-4 hover:outline-none hover:ring-gray-300 font-medium rounded-lg text-sm p-4 lg:py-8 lg:w-[180px] justify-center inline-flex items-center`}>
          {children}
          <span className='hidden md:block text-base ml-4'>{text}</span>
        </span>
        <span className='md:hidden'>{text}</span>
      </a>
    );
  };

  /* 홈화면 네비게이션 버튼 목록 */
  const NavButtons = () => {
    const links = [
      { href: '/community', text: '커뮤니티', color: 'green', icon: (
        <svg className='w-7 h-7 text-green-700' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z' />
        </svg>
      ) },
      { href: '/referenceroom', text: '자료실', color: 'purple', icon: (
        <svg className='w-7 h-7 text-purple-700' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
          <path stroke='currentColor' strokeLinejoin='round' strokeWidth='2' d='M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z' />
        </svg>
      ) },
      { href: '/gallery', text: '갤러리', color: 'red', icon: (
        <svg className='w-7 h-7 text-red-700' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 18'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z' />
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z' />
        </svg>
      ) },
      { href: '/tuxinfo01', text: 'TUX 소개', color: 'gray', icon: (
        <svg className='w-7 h-7 text-gray-700' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
        </svg>
      ) },
      { href: '/join', text: '지원하기', color: 'blue', icon: (
        <svg className='w-7 h-7 text-blue-700' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z' />
        </svg>
      ) }
    ];

    return (
      <>
        {links.map((link, index) => (
          <NavLink key={index} href={link.href} text={link.text} color={link.color}>
            {link.icon}
          </NavLink>
        ))}
      </>
    );
  };

  /* 최근 게시글 리스트 */
  const PostListSection = ({ title, moreLink, data, isGallery }) => {
    return (
      <div className='min-w-0'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold mt-6 mb-4'>{title}</h3>
          <a href={moreLink} className='font-medium text-gray-600 hover:underline mt-6 mb-4'>더보기</a>
        </div>
        {
          data && data.content.map(p => (
            <MainListItem key={p.id} post={p} isGallery={isGallery} />
          ))
        }
        {
          data && data.content.length === 0 &&
          <div className='text-center py-20'>
            <p className='text-lg text-gray-500'>조건에 해당하는 게시물이 없습니다.</p>
          </div>
        }
        { !data && <LoadingIndicator /> }
      </div>
    );
  };

	return (
		<>	
		<div>
      <Swiper className='Banner'
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        spaceBetween={10}
        centeredSlides={true}
        centerInsufficientSlides={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={() => {}}  
        onSlideChange={() => {}}>
        {
          banners && banners.map((banner, index) => (
            <SwiperSlide key={index} className='swiper-slide'>
              <img className="banner-no-select max-w-full w-[936px] max-h-80 max-md:px-1 max-md:max-h-48 rounded-lg" src={'/api/banner/' + banner} alt=''/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
    <div className='px-3 pt-10 pb-20'>
      <div className='flex justify-between mx-auto lg:w-[936px] w-full text-left'>
        <NavButtons />
      </div>

      {/* 공지사항, 대회/공모전 */}
      <div className='flex justify-between mx-auto lg:w-[936px] w-full text-left mt-10'>
        <div className="grid gap-12 mb-6 md:grid-cols-2 w-full">
          <PostListSection title='공지사항' moreLink='/community?type=notice' data={notices} isGallery={false} />
          <PostListSection title='대회/공모전' moreLink='/community?type=contest' data={contests} isGallery={false} />
        </div>
      </div>

      {/* 커뮤니티, 활동 사진 */}
      <div className='flex justify-between mx-auto lg:w-[936px] w-full text-left mt-6'>
        <div className="grid gap-12 mb-6 md:grid-cols-2 w-full">
          <PostListSection title='커뮤니티' moreLink='/community' data={posts} isGallery={false} />
          <PostListSection title='갤러리' moreLink='/gallery' data={photos} isGallery={true} />
        </div>
      </div>


      <div className="mx-auto lg:w-[936px] w-full text-left mt-12 text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl">TUX ❤️ Linux</h2>
          <p className="mb-8 text-base font-normal text-gray-500 lg:text-lg break-keep">
            TUX는 Linux 및 Open Source Software를 중점적으로 연구하는 충북대학교 소프트웨어학부 소속 학술 동아리입니다.
            Linux의 응용과 실습을 바탕으로 OSS를 이해하고, 활용할 능력을 갖추는 걸 목표로 하고 있습니다.  
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a href="/join" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
                  지원하기
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
              <a href="/tuxinfo01" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 ">
                  더 알아보기
              </a>  
          </div>
        </div>

    </div>
		</>
	);
};

export default Main;