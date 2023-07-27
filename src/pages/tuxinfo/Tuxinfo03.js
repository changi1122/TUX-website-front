import { useEffect } from "react";
import { people } from "../../static/jsons"

const PeopleBox = ({ props }) => {
    return (
        <li className={`${props.year % 2 === 0 ? 'md:float-left' : 'md:float-right'} float-none my-5 md:w-[50%] w-full border-b border-slate-500 ani-effect`}>
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
            <div className="border-b border-black w-full md:pb-20 pb-10 ani-fadein-up">
                <div className="text-lg">TUX 소개</div>
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
                <div className='clear-both py-2'></div>
            </div>
        </div>
    );
}

export default Tuxinfo03;