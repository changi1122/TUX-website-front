import { useState } from "react";
import { BsQuestionCircleFill } from 'react-icons/bs';
import { MdDeveloperMode } from 'react-icons/md';
import { gnbIsLogin, gnbIsNotLogin } from "../static/jsons"

const GnbSub = ({ sub }) => {
    return (
        <li>
            <a href={process.env.PUBLIC_URL + sub.subHref}
                className="md:w-[30vw] w-[90vw] block py-4 px-auto hover:bg-[#efefef] border-2">
                {sub.subName}
            </a>
        </li>
    )
};

const GnbBox = ({ gnb, isLogin }) => {
    return (
        <div className="mx-2">
            <a href={process.env.PUBLIC_URL + gnb.subInfo[0].subHref}
                className="md:w-[30vw] w-[90vw] block py-4 px-auto text-xl font-bold bg-[#efefef] hover:bg-gray-200">
                {gnb.gnbName}</a>
            <ul>
                {
                    isLogin
                        ?
                        gnbIsLogin.map((ele) =>
                            ele.subInfo.map((subEle) =>
                                ele.gnbName === gnb.gnbName ? <GnbSub key={subEle.subName} sub={subEle} /> : ''
                            )
                        )
                        :
                        gnbIsNotLogin.map((ele) =>
                            ele.subInfo.map((subEle) =>
                                ele.gnbName === gnb.gnbName ? <GnbSub key={subEle.subName} sub={subEle} /> : ''
                            )
                        )
                }
            </ul>
        </div>
    )
};

function Sitemap() {
    const [isLogin, setIsLogin] = useState(true);
    // localStorage로부터 user info를 받아와서 처리해야 하는듯 하지만? 일단 간단하게 처리

    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full md:pb-20 pb-10">
                <div className="text-lg">CBNU TUX</div>
                <div className="text-4xl font-bold">사이트 맵</div>
            </div>

            <div className="mt-20 md:px-20 px-0">
                <div className="flex md:flex-row flex-col gap-3 md:justify-center items-start">
                    {
                        gnbIsLogin.map((ele) => <GnbBox key={ele.gnbName} gnb={ele} isLogin={isLogin} />)
                    }
                </div>

                <div className="w-full flex md:flex-row flex-col justify-between mt-20 gap-8">
                    <div className="">
                        <BsQuestionCircleFill size={20} style={{ margin: 'auto auto auto 0' }} />
                        <div className="text-left mt-2">
                            <p>사이트 맵이란?</p>
                            <p className="text-justify">사이트에 표시할 콘텐츠들을 한 눈에 알아볼 수 있도록, 메뉴별로 구분하여 설계한 것을 말합니다.</p>
                        </div>
                    </div>

                    <div className="w-[300px] md:ml-0 ml-auto md:mt-0 mt-10">
                        <MdDeveloperMode size={30} style={{ margin: 'auto 0 auto auto' }} color="rgb(100 116 139)" />
                        <div className="text-right mt-2 text-slate-500">
                            <p>_Developers</p>
                            <p>Front-End</p>
                            <p className="">김예원, 변진호, 최경호</p>
                            <p>Back-End</p>
                            <p className="">오지우, 임수연, 차현아</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sitemap;