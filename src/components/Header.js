import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { IoLogoTux } from 'react-icons/io';
import './style.css';

function Header(props) {
    const [isScroll, setIsScroll] = useState(0);
    const [hover, setHover] = useState(0);
    // hover 1 - TUX소개, 2 - 커뮤니티, 3 - 자료실

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition === 0) {
            setIsScroll(0);
        } else {
            setIsScroll(1);
        }
    };

    return (
        <div className={`${isScroll === 1 ? 'top-0 z-50 sticky drop-shadow border-none' : ''} mb-2`}
            onMouseLeave={() => setHover(0)}>
            <div className={`w-full flex justify-center border-b-2 bg-white`}>
                <div className="w-[90%] flex justify-between items-center py-2">
                    <div className="flex items-center gap-5">
                        <a href={process.env.PUBLIC_URL + "/"} className="flex items-center gap-3 mr-5 text-left">
                            <IoLogoTux
                                size={40}
                            // style={{ transform: 'scaleX(-1)' }}
                            />
                            <div>
                                <h1 className="text-2xl font-black">CBNU TUX</h1>
                                <div className='text-base'>Linux study club</div>
                            </div>
                        </a>
                        <div
                            onMouseOver={() => { setHover(1); }}>
                            <a href={process.env.PUBLIC_URL + '/tuxinfo01'}>TUX소개</a>
                        </div>
                        <div
                            onMouseOver={() => { setHover(2); }}>
                            <a href={process.env.PUBLIC_URL + '/community01'} >커뮤니티</a>
                        </div>
                        <div
                            onMouseOver={() => { setHover(3); }}>
                            <a href={process.env.PUBLIC_URL + '/data01'} >자료실</a>
                        </div>
                    </div>
                    <div>
                        <a href={process.env.PUBLIC_URL + '/login'} className="hover:text-[#E95420]" >로그인</a>
                    </div>
                </div>
            </div>
            <nav
                className={`menu ${hover !== 0 ? 'active' : 'inactive'} absolute bg-gray-50 w-full z-50 text-left`}
            >
                {
                    hover === 1
                        ?
                        <ul className='flex gap-9 px-20 py-5 border-b-2 items-center'>
                            <li className='text-xl font-black'>
                                <a href={process.env.PUBLIC_URL + '/tuxinfo01'}>TUX소개</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/tuxinfo01'}>개요</a>
                            </li>
                            <li>
                                <a href='#'>연혁</a>
                            </li>
                            <li>
                                <a href='#'>구성원 소개</a>
                            </li>
                        </ul>
                        : ''
                }
                {
                    hover === 2
                        ?
                        <ul className='flex gap-9 px-20 py-5 border-b-2 items-center'>
                            <li className='text-xl font-black'>
                                <a href={process.env.PUBLIC_URL + '/community01'}>커뮤니티</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/community01'}>공지사항</a>
                            </li>
                            <li>
                                <a href='#'>팀원 모집</a>
                            </li>
                            <li>
                                <a href='#'>건의 게시판</a>
                            </li>
                            <li>
                                {/* private */}
                                <a href='#'>잡담방</a>
                            </li>
                        </ul>
                        : ''
                }
                {
                    hover === 3
                        ?
                        <ul className='flex gap-9 px-20 py-5 border-b-2 items-center'>
                            <li className='text-xl font-black'>
                                <a href={process.env.PUBLIC_URL + '/data01'}>자료실</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/data01'}>채용 · 취업 정보</a>
                            </li>
                            <li>
                                <a href='#'>공모전 정보</a>
                            </li>
                            <li>
                                <a href='#'>갤러리</a>
                            </li>
                            <li>
                                {/* private */}
                                <a href='/exam'>족보</a>
                            </li>
                        </ul>
                        : ''
                }
            </nav>
        </div >

    );
}

export default Header;