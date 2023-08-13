import React from 'react';
import { IoLogoTux } from 'react-icons/io';

const Loading = () => {

    return (
        <div className='min-h-screen p-5 md:p-20'>
            <div className='items-end mt-10'>
                <div className='inline-flex items-center'>
                    <IoLogoTux size={40} color='#777' />
                    <div className='ml-4' style={{ color: '#777' }}>로딩 중</div>
                </div>
            </div>
        </div>
    );
};

export default Loading;