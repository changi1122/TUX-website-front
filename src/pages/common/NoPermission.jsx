import { IoLogoTux, IoMdArrowBack, IoMdHome } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const NoPermission = () => {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen p-5 md:p-20'>
            <div className='items-end mt-10'>
                <div className='inline-flex'>
                    <div className='text-8xl font-black'>4</div>
                    <IoLogoTux size={90} />
                    <div className='text-8xl font-black'>3</div>
                </div>
                <div className='text-4xl font-bold mt-4'>권한 없음</div>
            </div>
            <div className='mt-10 md:text-center text-justify'>
                <div>현재 권한으로 접근할 수 없는 페이지입니다.</div>
                <div>관리자로부터 USER 권한을 받았는지 확인해 주세요.</div>
                <br></br>
                <div>권한 부여시에도 문제가 발생하면, 다시 로그인하세요.</div>
            </div>
            <div className='inline-flex md:gap-10 gap-3 mt-20'>
                <button className='md:text-lg text-base rounded-full py-3 px-6 font-semibold bg-gray-100 hover:bg-gray-200 inline-flex'
                    onClick={() => navigate(-1)}>
                    <IoMdArrowBack style={{ transform: 'translate(0, 4px)' }} />
                    <div className='ml-2'>이전 화면</div>
                </button>
                <button className='md:text-lg text-base rounded-full py-3 px-6 font-semibold bg-gray-100 hover:bg-gray-200 inline-flex'
                    onClick={() => navigate('/')}>
                    <IoMdHome style={{ transform: 'translate(0, 4px)' }} />
                    <div className='ml-2'>메인으로</div>
                </button>
            </div>
        </div>
    );
};

export default NoPermission;