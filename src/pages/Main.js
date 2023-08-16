import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Sw.css'

import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';

const Main = () => {

  const [notices, setNotices] = useState(); // 최근 공지사항
  const [contests, setContests] = useState(); // 최근 대회/공모전 정보
  const [frees, setFrees] = useState(); // 최근 자유게시판
  const [teams, setTeams] = useState(); // 최근 팀원 모집

  useEffect(() => {
    getPosts("notice", setNotices);
    getPosts("contest", setContests);
    getPosts("free", setFrees);
    getPosts("teamrecruitment", setTeams);
  }, []);

  async function getPosts(category, setCallback) {
    const res = await fetch(
        `/api/community/list/category?type=${category}&page=0&size=3`
    );
    setCallback(await res.json());
  }


	return (
		<>	
		<div>
      <Swiper className='Banner'
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        centeredSlides={true}
        centerInsufficientSlides={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={() => {}}  
        onSlideChange={() => {}}>
        <SwiperSlide className='swiper-slide'>
          <img className="max-w-full w-[936px] max-h-80 max-md:px-1 max-md:max-h-40 rounded-lg" src={process.env.PUBLIC_URL + '/images/intro01.jpg'} alt=''/>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <img className="max-w-[936px] max-h-80 max-md:px-1 max-md:max-h-40 rounded-lg" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} alt=''/>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <img className="max-w-[936px] max-h-80 max-md:px-1 max-md:max-h-40 rounded-lg" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} alt=''/>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide'>
          <img className="max-w-[936px] max-h-80 max-md:px-1 max-md:max-h-40 rounded-lg" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} alt=''/>
        </SwiperSlide>
      </Swiper>
    </div>
    <div className='px-3 pt-10 pb-20'>
      <div className='flex justify-between mx-auto lg:w-[600px] w-full text-left'>
        <a href='/community' className='inline-flex flex-col items-center'>
          <span className="text-green-700 border border-gray-300 hover:ring-4 hover:outline-none hover:ring-gray-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center">
            <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
            </svg>
          </span>
          <span>커뮤니티</span>
        </a>
        <a href='/referenceroom' className='inline-flex flex-col items-center'>
          <span className="text-purple-700 border border-gray-300 hover:ring-4 hover:outline-none hover:ring-gray-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center">
            <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
            </svg>
          </span>
          <span>자료실</span>
        </a>
        <a href='/gallery' className='inline-flex flex-col items-center'>
          <span className="text-red-700 border border-gray-300 hover:ring-4 hover:outline-none hover:ring-gray-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center">
            <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
            </svg>
          </span>
          <span>갤러리</span>
        </a>
        <a href='/tuxinfo01' className='inline-flex flex-col items-center'>
          <span className="text-gray-700 border border-gray-300 hover:ring-4 hover:outline-none hover:ring-gray-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center">
            <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
          </span>
          <span>TUX 소개</span>
        </a>
        <a href='/join' className='inline-flex flex-col items-center'>
          <span className="text-blue-700 border border-gray-300 hover:ring-4 hover:outline-none hover:ring-gray-300 font-medium rounded-lg text-sm p-4 text-center inline-flex items-center">
            <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
            </svg>
          </span>
          <span>지원하기</span>
        </a>
      </div>

      {/* 공지사항, 대회/공모전 */}
      <div className='flex justify-between mx-auto lg:w-[936px] w-full text-left mt-6'>
        <div className="grid gap-12 mb-6 md:grid-cols-2 w-full">
          <div>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold mt-6 mb-4'>공지사항</h3>
              <a href="/community?type=notice" className="font-medium text-gray-600 hover:underline mt-6 mb-4">더보기</a>
            </div>
            {
              notices && notices.content.map(p => (
              <Link key={p.id} to={"/community/"+p.id} className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <span className={badge(p.category)[0] + " text-xs font-medium rounded mr-2 mb-1 px-2.5 py-1 inline-block"}>{badge(p.category)[1]}</span>
                <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900" style={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.title}
                </h3>
                <div>
                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>📅</span> {dayjs(p.createdDate).format('YYYY-MM-DD')}</span>
                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>👀</span> {p.view}</span>
                </div>
              </Link>
            ))}
            {
              notices && notices.content.length === 0 &&
              <div className='text-center py-20'>
                  <p className='text-lg text-gray-500'>조건에 해당하는 게시물이 없습니다.</p>
              </div>
            }
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold mt-6 mb-4'>대회/공모전</h3>
              <a href="/community?type=contest" className="font-medium text-gray-600 hover:underline mt-6 mb-4">더보기</a>
            </div>
            {
              contests && contests.content.map(p => (
                <Link key={p.id} to={"/community/"+p.id} className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <span className={badge(p.category)[0] + " text-xs font-medium rounded mr-2 mb-1 px-2.5 py-1 inline-block"}>{badge(p.category)[1]}</span>
                  <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900" style={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.title}
                  </h3>
                  <div>
                      <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>📅</span> {dayjs(p.createdDate).format('YYYY-MM-DD')}</span>
                      <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>👀</span> {p.view}</span>
                  </div>
                </Link>
              ))}
            {
              contests && contests.content.length === 0 &&
              <div className='text-center py-20'>
                  <p className='text-lg text-gray-500'>조건에 해당하는 게시물이 없습니다.</p>
              </div>
            }
          </div>
        </div>
      </div>

      {/* 자유게시판, 팀원 모집 */}
      <div className='flex justify-between mx-auto lg:w-[936px] w-full text-left mt-6'>
        <div className="grid gap-12 mb-6 md:grid-cols-2 w-full">
          <div>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold mt-6 mb-4'>자유게시판</h3>
              <a href="/community?type=free" className="font-medium text-gray-600 hover:underline mt-6 mb-4">더보기</a>
            </div>
              {
                frees && frees.content.map(p => (
                  <Link key={p.id} to={"/community/"+p.id} className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <span className={badge(p.category)[0] + " text-xs font-medium rounded mr-2 mb-1 px-2.5 py-1 inline-block"}>{badge(p.category)[1]}</span>
                    <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900" style={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.title}
                    </h3>
                    <div>
                        <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>📅</span> {dayjs(p.createdDate).format('YYYY-MM-DD')}</span>
                        <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>👀</span> {p.view}</span>
                    </div>
                  </Link>
                ))}
              {
                frees && frees.content.length === 0 &&
                <div className='text-center py-20'>
                    <p className='text-lg text-gray-500'>조건에 해당하는 게시물이 없습니다.</p>
                </div>
              }
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold mt-6 mb-4'>팀원 모집</h3>
              <a href="/community?type=teamrecruitment" className="font-medium text-gray-600 hover:underline mt-6 mb-4">더보기</a>
            </div>
          {
            teams && teams.content.map(p => (
              <Link key={p.id} to={"/community/"+p.id} className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <span className={badge(p.category)[0] + " text-xs font-medium rounded mr-2 mb-1 px-2.5 py-1 inline-block"}>{badge(p.category)[1]}</span>
                <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900" style={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.title}
                </h3>
                <div>
                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>📅</span> {dayjs(p.createdDate).format('YYYY-MM-DD')}</span>
                    <span className='text-gray-500 text-sm font-medium mr-4'><span className='inline-block mr-1'>👀</span> {p.view}</span>
                </div>
              </Link>
            ))}
          {
            teams && teams.content.length === 0 &&
            <div className='text-center py-20'>
                <p className='text-lg text-gray-500'>조건에 해당하는 게시물이 없습니다.</p>
            </div>
          }
          </div>
        </div>
      </div>


      <div className="mx-auto lg:w-[936px] w-full text-left mt-12 text-center">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">TUX ❤️ Linux</h2>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl">
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

function badge(category) {
  switch(category) {
      case 'NOTICE':
          return ['bg-green-100 text-green-800', '공지사항'];
      case 'TEAMRECRUITMENT':
          return ['bg-pink-100 text-pink-800', '팀원 모집'];
      case 'CONTEST':
          return ['bg-yellow-100 text-yellow-800', '대회/공모전'];
      case 'JOB':
          return ['bg-red-100 text-red-800', '채용/취업 정보'];
      default:
          return ['bg-purple-100 text-purple-800', '자유게시판'];
  }
}

export default Main;