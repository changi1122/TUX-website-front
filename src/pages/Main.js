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
    <div style={{padding:40,  flex: 1 , flexDirection: 'column'}}>


      <div  style={{display: 'flex'}}>
        <div style={{padding:30,  flex: 1 , flexDirection: 'column'}}>
          <h3 className='text-3xl font-bold' style={{padding:20}}>공지 사항</h3>
          <PostMain />
        </div>
        <div style={{padding:30,  flex: 1 , flexDirection: 'column'}}>
          <h3 className='text-3xl font-bold' style={{padding:20}}>팀원 모집</h3>
          <PostMain />
        </div>
      </div>

      <div  style={{display: 'flex'}}>
        <div style={{margin:30,  flex: 1 , flexDirection: 'column'}} >
          <h3 className='text-3xl font-bold' style={{padding:20}}>건의 게시판</h3>
          <PostMain />
        </div>
        <div style={{margin:30,  flex: 1 , flexDirection: 'column'}}>
          <h3 className='text-3xl font-bold' style={{padding:20}}>잡담 방</h3>
          <PostMain />
        </div>
      </div>

      <div style={{ flex: 1}} >
        <Calendar
         onChange={onChange}
         value={value}
       />
      </div>

      </div>
		</>
	);
};



export default Main;