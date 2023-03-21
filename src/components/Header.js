import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { IoLogoTux, IoMdMenu, IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import './style.css';
import { gnbIsLogin, gnbIsNotLogin } from "../static/jsons"

function Header(props) {
    const navigate = useNavigate();

    /*
        사용자 로그인이 된 상태라면, Header 상단에 '로그인' 대신, '사용자 이름'과 '로그아웃' 표시
        또한, private page인 [커뮤니티]>[잡담방], [자료실]>[족보]가 노출됨
    */
    const [name, setName] = useState('dummy'); // 로그인 한 사용자 이름, 클릭 시 마이페이지로 이동..

    const [isScroll, setIsScroll] = useState(0);
    const [hover, setHover] = useState(-1); // hover 1 - TUX소개, 2 - 커뮤니티, 3 - 자료실
    const [isOpen, setIsOpen] = useState(false); // 모바일 기기 메뉴

    useEffect(() => {
        // 로그인 체크
        let token;
        if (localStorage.cbnu_tux_userid !== undefined) {
            // 로그인 할 때, '로그인 정보 유지' 체크했어요
            token = localStorage.getItem('cbnu_tux_userid');
            props.setIsLogin(true);
        }
        else {
            if (sessionStorage.cbnu_tux_userid !== undefined) {
                // 로그인 할 때, '로그인 정보 유지' 체크 안 했어요
                token = sessionStorage.getItem('cbnu_tux_userid');
                props.setIsLogin(true);
            }
            else {
                // 로그인 안 했어요
                setName('');
            }
        }
        setName(token);
    }, [props.isLogin]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const onClickLogout = () => {
        localStorage.removeItem('cbnu_tux_userid');
        sessionStorage.removeItem('cbnu_tux_userid');
        setName('');
        props.setIsLogin(false);
        navigate('/');
    }

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
                            props.isLogin
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
                        props.isLogin
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
        <div className={`${isScroll === 1 ? 'top-0 z-40 sticky drop-shadow border-none' : ''} mb-2`}
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
                        <div className='lg:flex hidden items-center'>
                            {
                                gnbIsLogin.map((ele, index) => <a href={process.env.PUBLIC_URL + ele.subInfo[0].subHref} onMouseOver={() => { setHover(index); }}>{ele.gnbName}</a>)
                            }
                        </div>
                    </div>
                    <div className='lg:flex hidden'>
                        {
                            props.isLogin
                                ?
                                <div>
                                    <a href={process.env.PUBLIC_URL + '/mypage'} className="hover:text-[#E95420]" >{name} 님</a>
                                    <a href="#" className="hover:text-[#E95420]" onClick={onClickLogout} >로그아웃</a>
                                </div>
                                :
                                <a href={process.env.PUBLIC_URL + '/login'} className="hover:text-[#E95420]" >로그인</a>
                        }
                    </div>
                    {/* 모바일 기기 메뉴 */}
                    <div className='lg:hidden flex'
                        onClick={() => toggleMenu()}>
                        <IoMdMenu size={25} />
                    </div>
                </div>
            </div>

            {/* 세부 메뉴 - ver.Laptop*/}
            <nav className={`menu ${hover !== -1 ? 'active' : 'inactive'} absolute bg-gray-50 w-full z-50 text-left`}>
                {handleLoptopMenu()}
            </nav>

            {/* 세부 메뉴 - ver.mobile*/}
            <nav className={`${isOpen ? "show-moblie-menu" : "hide-mobile-menu"} absolute top-0 drop-shadow-2xl bg-white w-[85vw] h-screen z-50 text-lg overflow-auto`}>
                {
                    props.isLogin
                        ?
                        <div className='px-10 py-5 border-b-2 flex'>
                            <button className='inline-flex w-[50vw] justify-end'
                                onClick={() => { toggleMenu(); onClickLogout(); }}>
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
            </nav>
        </div >

    );
}

export default Header;