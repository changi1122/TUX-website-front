import { useState } from "react";

function Tuxinfo01() {
    return (
        <div className='min-h-screen md:p-20 px-3 py-10'>
            TUX개요 - 개요

            <div>
                <div>
                    <div>TUX</div>
                    <div>Linux study club</div>
                    <div>since 2020</div>
                    <div>
                        <div>지도교수 노서영 교수님</div>
                        <div>위치 S4-1 108호</div>
                    </div>
                </div>
                <div>
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

            <div>
                <div>주요 활동</div>
                <div>Linux 및 OSS 연구, 프로그래밍 언어(C, C++, Java, Python) 스터디, 웹사이트 및 서버 구축</div>
            </div>

            <div>
                <div>공개한 오픈소스 프로젝트</div>
                <div>깃허브 링크해서 싹</div>
            </div>
        </div>
    );
}

export default Tuxinfo01;