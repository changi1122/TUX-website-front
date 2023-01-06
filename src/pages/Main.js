import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Sw.css'

const Main = (props) => {
	return (
		<>	
		<div>
			<h3 className='text-xl font-bold'>메인페이지</h3>
			</div>
			
			<div>
			<Swiper className='Banner'
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
	  centeredSlides={true}
	  centerInsufficientSlides={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')
	  
	}
    >
      <SwiperSlide className='swiper-slide'><img className="w-10 h-10" src={process.env.PUBLIC_URL + '/logo192.png'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-10 h-10" src={process.env.PUBLIC_URL + '/logo192.png'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-10 h-10" src={process.env.PUBLIC_URL + '/logo192.png'} /></SwiperSlide>
      <SwiperSlide className='swiper-slide'><img className="w-10 h-10" src={process.env.PUBLIC_URL + '/logo192.png'} />	</SwiperSlide>
      ...
    </Swiper>
    </div>
		</>
	);
};



export default Main;