import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

function Header(props) {
    const [isScroll, setIsScroll] = useState(0);

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
        <div className={`${isScroll === 1 ? 'bg-black top-0 z-50 sticky' : ''} w-full flex justify-center mb-2 bg-black`}>
            <div className="w-[90%] flex justify-between items-center py-2">
                <div className="flex items-center gap-[1em]">
                    <a href={process.env.PUBLIC_URL + "/"} className="flex items-center gap-2 mr-5">
                        <img className="w-10 h-10" src={process.env.PUBLIC_URL + '/logo192.png'} />
                        <h1 className="text-white text-xl font-bold">Tux 홈페이지</h1>
                    </a>
                    <a href={process.env.PUBLIC_URL+'/page/1'} className={`text-white`}>페이지1</a>
                    <a href={process.env.PUBLIC_URL+'/tmp'} className={`text-white`} >또는n번째메뉴</a>
                    <a href={process.env.PUBLIC_URL+'/tmp'} className={`text-white`} >hover시아래에세부메뉴노출</a>
                </div>
                <div>
                    <a href={process.env.PUBLIC_URL+'/login'} className={`text-white`}>로그인</a>
                </div>
            </div>
        </div>
    );
}

export default Header;