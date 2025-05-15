import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const PeopleBox = ({ props }) => {
    return (
        <li className={`${props.year % 2 === 0 ? 'md:float-left' : 'md:float-right'} float-none my-5 md:w-[48%] w-full h-[100%] border-b border-slate-500`}>
            <div className="w-full">
                <div className="px-6 pt-3 border-x border-slate-300">
                    <span className="text-4xl font-semibold">{props.generation}</span>
                    <span className="pl-3">{props.year}</span>
                </div>
                <div className="text-lg px-6 py-3">
                    {
                        props.people.map((ele, index) => <div key={index} className="py-1">{ele}</div>)
                    }
                </div>
            </div>
        </li>
    )
}

function Tuxinfo03() {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        loadPeople();
    }, []);

    async function loadPeople() {
        const res = await fetch(`/api/staticpage/people`, { method: "GET" });
        if (res.ok) {
            const page = await res.json();
            setPeople(JSON.parse(decodeURI(page.body)));
        }
    }


    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full pb-20 ani-fadein-up relative">
                <div className="text-lg">TUX 소개</div>
                <div className="text-4xl font-bold">구성원 소개</div>
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
                    <div className="text-4xl text-black">TUX People</div>
                    <p className="text-2xl">TUX의 기수별 임원진 소개</p>
                </div>

                <ul className='flex flex-wrap justify-between'>
                    {
                        people.map((ele) => <PeopleBox key={ele.generation} props={ele} />)
                    }
                </ul>
                <div className='clear-both py-2'></div>
            </div>
        </div>
    );
}

export default Tuxinfo03;