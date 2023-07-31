import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Calendar from 'react-calendar';
import PostMain from './post/Postmain';

import 'react-calendar/dist/Calendar.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Sw.css'

const Main = (props) => {
  const [value, onChange] = useState(new Date());

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
      onSwiper={(swiper) => console.log(swiper)}  
      onSlideChange={() => console.log('slide change')
	  
	}
    >
      <SwiperSlide className='swiper-slide'><img className="w-200 h-80" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-200 h-80" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-200 h-80" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-200 h-80" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} />	</SwiperSlide>
      ...
    </Swiper>
    </div>
    <div className='p-2 flex-auto'>


      <div  >
        <div className='p-5 m-30 flex-auto xl:px-48'>
          <h3 className='max-w-md mx-auto  overflow-hidden md:max-w-2xl font-bold text-2xl'>공지 사항</h3>
          <PostMain />
        </div>
        <div className='p-5 m-30 flex-auto xl:px-48'>
          <h3 className='max-w-md mx-auto  overflow-hidden md:max-w-2xl font-bold text-2xl'>팀원 모집</h3>
          <PostMain />
        </div>
      </div>

      <div  >
        <div className='p-5 m-30 flex-auto xl:px-48' >
          <h3 className='max-w-md mx-auto overflow-hidden md:max-w-2xl font-bold text-2xl '>건의 게시판</h3>
          <PostMain />
        </div>
        <div className='p-5 m-30 flex-auto xl:px-48'>
          <h3 className='max-w-md mx-auto overflow-hidden md:max-w-2xl font-bold text-2xl ' >잡담 방</h3>
          <PostMain />
        </div>
      </div>


      <div className="md:w-1/3 w-d h-full lg:flex lg:float-left">
        <div className="md:w-1/3 w-full bg-blue-0 xxxx-bg flex flex-wrap content-center">
            <div className="m-auto w-100">
            <Calendar
              onChange={onChange}
              value={value}
            />
            </div>
        </div>
    </div>
        
      </div>

      
		</>
	);
};



export default Main;