import { useState } from "react";

function Tuxinfo01() {


    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full md:pb-20 pb-10">
                <div className="text-lg">TUX개요</div>
                <div className="text-4xl font-bold">개요</div>
            </div>

            <div className="mt-20 text-left md:px-[20vw] px-0">
                <div className="w-full flex md:flex-row flex-col justify-between mt-20 gap-8">
                    <div className="md:w-[50%] w-full">
                        <div className="text-left mt-2 text-2xl">
                            <div className="text-6xl font-black">TUX</div>
                            <div>Linux study club</div>
                            <div>since 2020</div>
                            <br></br>
                            <div className="text-lg">
                                <div>지도교수_ 노서영 교수님</div>
                                <div>위치_ S4-1 108호</div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-[50%] w-full md:ml-0 ml-auto md:mt-0 mt-5">
                        <div className="text-justify mt-2 flex flex-col gap-3">
                            <p>
                                오픈소스 소프트웨어의 활용 능력을 중시하는 기업이 늘면서, OSS의 근간이 되는 Linux에 대한 이해의 필요성이 부각되고 있습니다.
                            </p>
                            <p>
                                따라서 저희 TUX는 Linux에 대한 연구, 나아가서 관련 자격증 취득 및 공모전 활동을 통한 오픈소스의 활용 경험 축적을 도모합니다.
                            </p>
                            <p>
                                또한 1, 2학년 분들을 위한 프로그래밍 언어 스터디, 서버 구축 세미나를 진행하여 학과 생활에 도움드리고자 노력 중입니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-justify flex flex-col gap-2">
                    <div className="text-left w-fit py-2 px-4 border-b-2 border-black font-bold">주요 활동</div>
                    <div className="px-3">Linux 및 OSS 연구, 프로그래밍 언어(C, C++, Java, Python) 스터디, 웹사이트 및 서버 구축</div>
                </div>

                <div className="mt-20 text-justify flex flex-col gap-2">
                    <div className="text-left w-fit py-2 px-4 border-b-2 border-black font-bold">공개한 오픈소스 프로젝트</div>
                    <div className="px-3">
                        github api
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tuxinfo01;