import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { IoLogoTux, IoMdMenu, IoIosLogIn } from 'react-icons/io';
import './style.css';
import { gnbIsLogin, gnbIsNotLogin } from "../static/jsons"

function Header(props) {
    const navigate = useNavigate();

    const [isScroll, setIsScroll] = useState(0);
<<<<<<< HEAD
    const [hover, setHover] = useState(0);
    // hover 1 - TUX소개, 2 - 커뮤니티, 3 - 자료실

=======
    const [hover, setHover] = useState(-1); // hover 1 - TUX소개, 2 - 커뮤니티, 3 - 자료실
>>>>>>> 1bf73722a24ac707729d57f625b175d1349ba650
    const [isOpen, setIsOpen] = useState(false); // 모바일 기기 메뉴

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

    const toggleMenu = () => {
        setIsOpen(isOpen => !isOpen); // on, off
    }

    const handleLoptopMenu = () => {
        const result = [];

        for (let i = 0; i < gnbIsLogin.length; i++) {
            if (hover === i) {
                result.push(
                    <ul className='flex px-20 py-5 border-b-2 items-center nav'>
                        <li className='text-xl font-black'>
                            <a href={process.env.PUBLIC_URL + gnbIsLogin[hover].subInfo[0].subHref}>{gnbIsLogin[hover].gnbName}</a>
                        </li>
                        {
                            isLogin
                                ?
                                gnbIsLogin.map((ele, index) =>
                                    ele.subInfo.map((subEle) =>
                                        hover === index ?
                                            <li>
                                                <a href={process.env.PUBLIC_URL + subEle.subHref}>{subEle.subName}</a>
                                            </li>
                                            : ''
                                    )
                                )
                                :
                                gnbIsNotLogin.map((ele, index) =>
                                    ele.subInfo.map((subEle) =>
                                        hover === index ?
                                            <li>
                                                <a href={process.env.PUBLIC_URL + subEle.subHref}>{subEle.subName}</a>
                                            </li>
                                            : ''
                                    )
                                )
                        }
                    </ul>
                )
            }
            else {
                result.push('');
            }
        }
        return result;
    }

    const handleMobileMenu = () => {
        const result = [];

        for (let i = 0; i < gnbIsLogin.length; i++) {
            result.push(
                <ul className='flex-col flex px-10 border-b-2'>
                    <a className='text-xl font-black w-full justify-end flex py-3'
                        onClick={() => { navigate(process.env.PUBLIC_URL + gnbIsLogin[i].subInfo[0].subHref); toggleMenu(); }}>
                        {gnbIsLogin[i].gnbName}
                    </a>
                    {
                        isLogin
                            ?
                            gnbIsLogin.map((ele, index) =>
                                ele.subInfo.map((subEle) =>
                                    i === index ?
                                        <a className='w-full justify-end flex sm:py-3 py-2'
                                            onClick={() => { navigate(process.env.PUBLIC_URL + subEle.subHref); toggleMenu(); }}>
                                            {subEle.subName}
                                        </a>
                                        : ''
                                )
                            )
                            :
                            gnbIsNotLogin.map((ele, index) =>
                                ele.subInfo.map((subEle) =>
                                    i === index ?
                                        <a className='w-full justify-end flex sm:py-3 py-2'
                                            onClick={() => { navigate(process.env.PUBLIC_URL + subEle.subHref); toggleMenu(); }}>
                                            {subEle.subName}
                                        </a>
                                        : ''
                                )
                            )
                    }
                </ul>
            )
        }
        return result;
    }

    return (
        <div className={`${isScroll === 1 ? 'top-0 z-50 sticky drop-shadow border-none' : ''} mb-2`}
            onMouseLeave={() => setHover(-1)}>
            <div className={`w-full flex justify-center border-b-2 bg-white md:p-0 py-2`}>
                <div className="w-[90%] flex justify-between items-center nav">
                    <div className="flex">
                        <a href={process.env.PUBLIC_URL + "/"}
                            className="flex items-center gap-3 md:mr-5 text-left logo">
                            <IoLogoTux size={40} />
                            <div>
                                <h1 className="text-2xl font-black">CBNU TUX</h1>
                                <div className='text-base'>Linux study club</div>
                            </div>
                        </a>
                        <div className='md:flex hidden items-center'>
                            {
                                gnbIsLogin.map((ele, index) => <a href={process.env.PUBLIC_URL + ele.subInfo[0].subHref} onMouseOver={() => { setHover(index); }}>{ele.gnbName}</a>)
                            }
                        </div>
                    </div>
                    <div className='md:flex hidden'>
                        <a href={process.env.PUBLIC_URL + '/login'} className="hover:text-[#E95420]" >로그인</a>
                    </div>

                    {/* 모바일 기기 메뉴 */}
                    <div className='md:hidden flex'
                        onClick={() => toggleMenu()}>
                        <IoMdMenu size={25} />
                    </div>
                </div>
            </div>

            {/* 세부 메뉴 - ver.Laptop*/}
<<<<<<< HEAD
            <nav
                className={`menu ${hover !== 0 ? 'active' : 'inactive'} absolute bg-gray-50 w-full z-50 text-left`}
            >
                {
                    hover === 1
                        ?
                        <ul className='flex px-20 py-5 border-b-2 items-center nav'>
                            <li className='text-xl font-black'>
                                <a href={process.env.PUBLIC_URL + '/tuxinfo01'}>TUX소개</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/tuxinfo01'}>개요</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/tuxinfo02'}>연혁</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/tuxinfo03'}>구성원 소개</a>
                            </li>
                        </ul>
                        : ''
                }
                {
                    hover === 2
                        ?
                        <ul className='flex px-20 py-5 border-b-2 items-center nav'>
                            <li className='text-xl font-black'>
                                <a href={process.env.PUBLIC_URL + '/community01'}>커뮤니티</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/community01'}>공지사항</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/community02'}>팀원 모집</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/community03'}>건의 게시판</a>
                            </li>
                            <li>
                                {/* private */}
                                <a href={process.env.PUBLIC_URL + '/community04'}>잡담방</a>
                            </li>
                        </ul>
                        : ''
                }
                {
                    hover === 3
                        ?
                        <ul className='flex px-20 py-5 border-b-2 items-center nav'>
                            <li className='text-xl font-black'>
                                <a href={process.env.PUBLIC_URL + '/data01'}>자료실</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/data01'}>채용 · 취업 정보</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/data02'}>공모전 정보</a>
                            </li>
                            <li>
                                <a href={process.env.PUBLIC_URL + '/data03'}>갤러리</a>
                            </li>
                            <li>
                                {/* private */}
                                <a href={process.env.PUBLIC_URL + '/exam'}>족보</a>
                            </li>
                        </ul>
                        : ''
                }
            </nav>

            {/* 세부 메뉴 - ver.mobile*/}
            <nav className={`${isOpen ? "show-moblie-menu" : "hide-mobile-menu"} absolute bg-white w-full h-screen z-50 text-lg`}>
                <button className='px-10 py-5 border-b-2 w-full justify-end inline-flex'
                    onClick={() => { navigate(process.env.PUBLIC_URL + '/login'); toggleMenu(); }}>
                    < IoIosLogIn style={{ transform: 'translate(0, 4px)' }} />
                    <div className='ml-2'>로그인</div>
                </button>

                <ul className='flex-col flex gap-5 px-10 py-5 border-b-2'>
                    <button className='text-xl font-black w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/tuxinfo01'); toggleMenu(); }}>
                        TUX소개
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/tuxinfo01'); toggleMenu(); }}>
                        개요
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/tuxinfo02'); toggleMenu(); }}>
                        연혁
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/tuxinfo03'); toggleMenu(); }}>
                        구성원 소개
                    </button>
                </ul>
                <ul className='flex-col flex gap-5 px-10 py-5 border-b-2'>
                    <button className='text-xl font-black w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/community01'); toggleMenu(); }}>
                        커뮤니티
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/community01'); toggleMenu(); }}>
                        공지사항
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/community02'); toggleMenu(); }}>
                        팀원 모집
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/community03'); toggleMenu(); }}>
                        건의 게시판
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/community04'); toggleMenu(); }}>
                        {/* private */}
                        잡담방
                    </button>
                </ul>
                <ul className='flex-col flex gap-5 px-10 py-5 border-b-2'>
                    <button className='text-xl font-black w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/data01'); toggleMenu(); }}>
                        자료실
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/data01'); toggleMenu(); }}>
                        채용 · 취업 정보
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/data02'); toggleMenu(); }}>
                        공모전 정보
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/data03'); toggleMenu(); }}>
                        갤러리
                    </button>
                    <button className='w-full justify-end flex'
                        onClick={() => { navigate(process.env.PUBLIC_URL + '/exam'); toggleMenu(); }}>
                        {/* private */}
                        족보
                    </button>
                </ul>
=======
            <nav className={`menu ${hover !== -1 ? 'active' : 'inactive'} absolute bg-gray-50 w-full z-50 text-left`}>
                {handleLoptopMenu()}
            </nav>

            {/* 세부 메뉴 - ver.mobile*/}
            <nav className={`${isOpen ? "show-moblie-menu" : "hide-mobile-menu"} absolute top-0 drop-shadow-2xl bg-white w-[85vw] h-screen z-50 text-lg overflow-auto`}>
                {
                    isLogin
                        ?
                        <div className='px-10 py-5 border-b-2 flex'>
                            <button className='inline-flex w-[50vw] justify-end'
                                onClick={() => { toggleMenu(); }}>
                                < IoIosLogOut style={{ transform: 'translate(0, 4px)' }} />
                                <div className='ml-2'>로그아웃</div>
                            </button>
                            <button className='inline-flex w-[50vw] justify-end'
                                onClick={() => { navigate(process.env.PUBLIC_URL + '/mypage'); toggleMenu(); }}>
                                <div className='ml-2'>{name} 님</div>
                            </button>
                        </div>
                        :
                        <button className='px-10 py-5 border-b-2 w-full justify-end inline-flex'
                            onClick={() => { navigate(process.env.PUBLIC_URL + '/login'); toggleMenu(); }}>
                            < IoIosLogIn style={{ transform: 'translate(0, 4px)' }} />
                            <div className='ml-2'>로그인</div>
                        </button>
                }
                {handleMobileMenu()}
>>>>>>> 1bf73722a24ac707729d57f625b175d1349ba650
            </nav>
        </div >

    );
}

export default Header;