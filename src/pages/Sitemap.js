import { useState } from "react";
import { BsQuestionCircleFill } from 'react-icons/bs';

const gnbList = [
    {
        "gnbName": "TUX개요",
        "subInfo": [
            {
                "subName": "개요",
                "subHref": "/tuxinfo01"
            },
            {
                "subName": "연혁",
                "subHref": "/tuxinfo02"
            },
            {
                "subName": "구성원 소개",
                "subHref": "/tuxinfo03"
            }
        ]
    },
    {
        "gnbName": "커뮤니티",
        "subInfo": [
            {
                "subName": "공지사항",
                "subHref": "/community01"
            },
            {
                "subName": "팀원 모집",
                "subHref": "/community02"
            },
            {
                "subName": "건의 게시판",
                "subHref": "/community03"
            },
            {
                // 추후 private 처리를 하든, 아예 숨기든 조치할 것
                "subName": "잡담방",
                "subHref": "/community04"
            }
        ]
    },
    {
        "gnbName": "자료실",
        "subInfo": [
            {
                "subName": "채용 · 취업 정보",
                "subHref": "/data01"
            },
            {
                "subName": "공모전 정보",
                "subHref": "/data02"
            },
            {
                "subName": "갤러리",
                "subHref": "/data03"
            },
            {
                // 추후 private 처리를 하든, 아예 숨기든 조치할 것
                "subName": "족보",
                "subHref": "/exam"
            }
        ]
    }
];

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

const GnbBox = ({ gnb }) => {
    return (
        <div className="mx-2">
            <a href={process.env.PUBLIC_URL + gnb.subInfo[0].subHref}
                className="md:w-[30vw] w-[90vw] block py-4 px-auto text-xl font-bold bg-[#efefef] hover:bg-gray-200">
                {gnb.gnbName}</a>
            <ul>
                {
                    gnbList.map((ele) =>
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
    return (
        <div className='min-h-screen md:p-20 px-3 py-10'>
            <div>
                <div className='text-3xl font-black'>CBNU TUX</div>
                <div className="text-3xl">사이트 맵</div>
            </div>

            <div className="mt-10 flex md:flex-row flex-col gap-3 md:justify-center items-start">
                {
                    gnbList.map((ele) => <GnbBox key={ele.gnbName} gnb={ele} />)
                }
            </div>

            <div className="mt-20 px-[25vw]">
                <BsQuestionCircleFill size={20} style={{ margin: 'auto' }} />
                <div className="text-left mt-2">
                    <p>사이트 맵이란?</p>
                    <p className="text-justify">시스템 구조를 바탕으로 사이트에 표시할 콘텐츠들을 한 눈에 알아볼 수 있도록, 메뉴별로 구분하여 설계한 것을 말합니다.</p>
                </div>
            </div>
        </div>
    );
}

export default Sitemap;