import { useState } from "react";
import './style.css'
import { history } from "../../static/jsons"

const HistoryBox = ({ props }) => {
    return (
        <div className="flex lg:gap-24 gap-10 relative">
            <h1 className="lg:text-6xl text-4xl font-thin bg-[#efefef] text-slate-400 relative leading-none lg:pl-36 pl-10">{props.year}</h1>
            <ol className="text-lg pb-20">
                {
                    props.contents.map((ele) =>
                        <li className="leading-8">{"- " + ele}</li>
                    )
                }
            </ol>
        </div>
    )
}

function Tuxinfo02() {
    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full md:pb-20 pb-10">
                <div className="text-lg">TUX개요</div>
                <div className="text-4xl font-bold">연혁</div>
            </div>

            <div className="mt-20 text-left lg:px-[25vw] px-0">
                <div>
                    <div className="text-4xl text-black">TUX HISTORY</div>
                    <p className="text-2xl">TUX의 주요 활동과 실적들</p>
                </div>

                <div className="history mt-10 mx-auto">
                    {
                        history.map((ele) => <HistoryBox key={ele.year} props={ele} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Tuxinfo02;