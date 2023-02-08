import { useState, useEffect } from "react";
import './style.css'
import { history } from "../../static/jsons"

const HistoryBox = ({ props }) => {
    return (
        <li className="flex lg:gap-24 gap-10 relative ani-effect">
            <h1 className="lg:text-6xl text-4xl font-thin bg-[#efefef] text-slate-400 relative leading-none lg:pl-36 pl-10">{props.year}</h1>
            <ol className="text-lg pb-20">
                {
                    props.contents.map((ele) =>
                        <li className="leading-8">{"- " + ele}</li>
                    )
                }
            </ol>
        </li>
    )
}

function Tuxinfo02() {
    useEffect(() => {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // entry의 target으로 DOM에 접근
                const $target = entry.target;

                // 화면에 노출 상태에 따라.. -> 해당 엘리먼트의 class를 컨트롤
                if (entry.isIntersecting) {
                    $target.classList.add("on");
                }
            });
        });

        // 옵저버할 대상 DOM을 선택하여 관찰
        const $items = document.querySelectorAll("li");
        $items.forEach((item) => {
            io.observe(item);
        })
    }, []);

    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full md:pb-20 pb-10 fadein-up">
                <div className="text-lg">TUX개요</div>
                <div className="text-4xl font-bold">연혁</div>
            </div>

            <div className="mt-20 text-left lg:px-[25vw] px-0">
                <div>
                    <div className="text-4xl text-black">TUX HISTORY</div>
                    <p className="text-2xl">TUX의 주요 활동과 실적들</p>
                </div>

                <ul className="history mt-10 mx-auto">
                    {
                        history.map((ele) => <HistoryBox key={ele.year} props={ele} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default Tuxinfo02;