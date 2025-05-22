import { IoLogoTux } from 'react-icons/io';

export default function LoadingIndicator() {

    return (
        <div className='text-center py-10'>
            <div className='items-end mt-10'>
                <div className='inline-flex items-center'>
                    <IoLogoTux size={40} color='#777' />
                    <div className='ml-4' style={{ color: '#777' }}>로딩 중</div>
                </div>
            </div>
        </div>
    );
}