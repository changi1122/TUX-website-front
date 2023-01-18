import React from 'react';
import { IoLogoTux, IoMdArrowBack, IoMdHome } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='min-h-[83.99vh] p-20'>
            <div className='inline-flex items-end mt-10'>
                <div className='text-9xl font-black'>4</div>
                <IoLogoTux size={130} />
                <div className='text-9xl font-black mr-10'>4</div>
                <div className='text-6xl font-bold'>Not Found</div>
            </div>
            <div className='mt-10'>
                <div>페이지를 찾을 수 없습니다.</div>
                <br></br>
                <div>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</div>
                <div>올바른 URL을 입력하셨는지 확인해 주세요.</div>
            </div>
            <div className='inline-flex gap-10 mt-20'>
                <button className='text-xl rounded-full py-3 px-6 font-semibold bg-[#efefef] hover:bg-gray-200 inline-flex'
                    onClick={() => navigate(-1)}>
                    <IoMdArrowBack style={{ transform: 'translate(0, 4px)' }} />
                    <div className='ml-2'>이전 화면</div>
                </button>
                <button className='text-xl rounded-full py-3 px-6 font-semibold bg-[#efefef] hover:bg-gray-200 inline-flex'
                    onClick={() => navigate('/')}>
                    <IoMdHome style={{ transform: 'translate(0, 4px)' }} />
                    <div className='ml-2'>메인으로</div>
                </button>
            </div>
        </div>
    );
};

export default NotFound;