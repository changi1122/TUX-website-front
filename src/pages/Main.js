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
			<h3 className='text-xl font-bold'>메인페이지</h3>
			</div>
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
      <SwiperSlide className='swiper-slide'><img className="w-100 h-80" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-100 h-80" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-100 h-80" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-100 h-80" src={process.env.PUBLIC_URL + '/Slide_dummy.jpg'} />	</SwiperSlide>
      ...
    </Swiper>
    </div>
    <div style={{padding:40,  flex: 1 , flexDirection: 'column'}}>
      <div style={{ flex: 1}} >
        <Calendar
         onChange={onChange}
         value={value}
       />
      </div>

      <div style={{flex: 1 }}>
      <h3 className='text-xl font-bold'>공지 사항</h3>
      <div >
        <PostMain />
      </div>
      <h3 className='text-xl font-bold'>팀원 모집</h3>
      <div >
        <PostMain />
      </div>
      <h3 className='text-xl font-bold'>건의 게시판</h3>
      <div >
        <PostMain />
      </div>
      <h3 className='text-xl font-bold'>잡담 방</h3>
      <div >
        <PostMain />
      </div>
      </div>

      </div>
		</>
	);
};



export default Main;