import { useState } from "react";
import { people } from "../../static/jsons"

const PeopleBox = ({ props }) => {
    return (
        <li className={`${props.year % 2 === 0 ? 'md:float-left' : 'md:float-right'} float-none my-5 md:w-[50%] w-full border-b border-slate-500`}>
            <div className="w-full">
                <div className="px-6 pt-3 border-x border-slate-300">
                    <span className="text-4xl font-semibold">{props.generation}</span>
                    <span className="pl-3">{props.year}</span>
                </div>
                <div className="text-lg px-6 py-3">
                    {
                        props.people.map((ele) => <div className="py-1">{ele}</div>)
                    }
                </div>
            </div>
        </li>
    )
}

function Tuxinfo03() {
    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full md:pb-20 pb-10">
                <div className="text-lg">TUX개요</div>
                <div className="text-4xl font-bold">구성원 소개</div>
            </div>

            <div className="mt-20 mx-auto lg:w-[936px] w-full text-left">
                <div>
                    <div className="text-4xl text-black">TUX People</div>
                    <p className="text-2xl">TUX의 기수별 임원진 소개</p>
                </div>

                <ul>
                    {
                        people.map((ele) => <PeopleBox key={ele.generation} props={ele} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default Tuxinfo03;