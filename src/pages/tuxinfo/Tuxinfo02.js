import { useState } from "react";
import './style.css'
import { history } from "../../static/jsons"

const HistoryBox = ({ props }) => {
    return (
        <div>
            <h1 className="text-2xl">{props.year}</h1>
            <ol>
                {
                    props.contents.map((ele) =>
                        <li>{"- " + ele}</li>
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

            <div className="mt-20 text-left md:px-[20vw] px-0">
                <div>
                    <div className="text-3xl text-black">TUX HISTORY</div>
                    <p>주요 활동과 실적들</p>
                </div>

                <div className="history mt-10">
                    {
                        history.map((ele) => <HistoryBox key={ele.year} props={ele} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default Tuxinfo02;