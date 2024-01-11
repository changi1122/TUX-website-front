import { useEffect, useState } from "react";
import './style.css'
import { Link } from 'react-router-dom';

const HistoryBox = ({ props }) => {
    return (
        <li className="flex lg:gap-24 gap-10 relative ani-effect">
            <h1 className="lg:text-6xl text-4xl font-thin bg-[#efefef] text-slate-400 relative leading-none lg:pl-36 pl-10">{props.year}</h1>
            <ol className="text-lg pb-20">
                {
                    props.contents.map((ele, index) =>
                        <li key={index} className="leading-8">{ele}</li>
                    )
                }
            </ol>
        </li>
    )
}

function Tuxinfo02() {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {
        const res = await fetch(`/api/staticpage/history`, { method: "GET" });
        if (res.ok) {
            const page = await res.json();
            setHistory(JSON.parse(decodeURI(page.body)));
        }
    }


    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full pb-20 ani-fadein-up relative">
                <div className="text-lg">TUX 소개</div>
                <div className="text-4xl font-bold">연혁</div>
                <div className='absolute bottom-0 w-full m-[-1px]'>
                    <div className="inline-flex w-full max-w-sm shadow-sm" role="group">
                        <Link to={"/tuxinfo01"}
                            className="flex-1 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
                            개요
                        </Link>
                        <Link to={"/tuxinfo02"}
                            className="flex-1 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
                            연혁
                        </Link>
                        <Link  to={"/tuxinfo03"}
                            className="flex-1 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
                            구성원 소개
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-20 mx-auto lg:w-[936px] w-full text-left">
                <div>
                    <div className="text-4xl text-black">TUX HISTORY</div>
                    <p className="text-2xl">TUX의 주요 활동과 실적들</p>
                </div>

                <ul className="history mt-10 mx-auto">
                    {
                        history && history.map((ele) => <HistoryBox key={ele.year} props={ele} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default Tuxinfo02;