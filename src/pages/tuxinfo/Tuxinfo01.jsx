import { useState, useEffect } from "react";
import { Octokit } from "octokit";
import { Link } from 'react-router-dom';

const OSSProjects = ({ props }) => {
    return (
        <li className="float-left lg:w-[48%] xl:w-[31.33%] w-full m-[1%] hover:shadow-2xl transition duration-300 ease-in-out ani-effect">
            <a href={props.html_url} target="_blank" rel="noreferrer">
                <img src={`https://opengraph.githubassets.com/${props.id}/CBNU-TUX/${props.name}`} />
                {/* 참고: https://stackoverflow.com/questions/68839829/how-can-i-get-the-open-graph-image-for-a-github-repository */}
            </a>
        </li>
    )
}

function Tuxinfo01() {
    const [projects, setProjects] = useState([]);

    async function getProjects() {
        const octokit = new Octokit({
            auth: undefined /*process.env.REACT_APP_OCTOKIT_TOKEN (공개 정보로 인증 없이 조회 가능)*/
        });

        return await octokit.request('GET /orgs/{org}/repos?sort={sort}&per_page={perPage}', {
            // 매개변수 정보는 이곳에서: https://docs.github.com/ko/rest/repos/repos?apiVersion=2022-11-28
            org: 'CBNU-TUX',
            sort: 'updated', // created(기본값), updated, pushed, full_name
            perPage: 6 // The number of results per page (max 100, 기본값 30)
        })
    }

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
    });

    useEffect(() => {
        // github api를 통해, org CBNU-TUX의 repos 정보들을 받아와 projects에 저장
        getProjects().then(response => {
            if (response.status === 200) {
                setProjects(response.data);
            }
        });
    }, []);

    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full pb-20 ani-fadein-up relative">
                <div className="text-lg">TUX 소개</div>
                <div className="text-4xl font-bold">개요</div>
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

            <div className="mt-20 text-left md:px-[20vw] px-0">
                <div className="w-full flex md:flex-row flex-col justify-between mt-20 gap-8">
                    <div className="md:w-[50%] w-full">
                        <div className="text-left mt-2 text-2xl">
                            <div className="text-6xl font-black">TUX</div>
                            <div>Linux & OSS Club</div>
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
                            <p className="text-4xl font-thin">Hello, world! <span className="ani-blinking">_</span></p>
                            <p>
                                TUX는 Linux 및 Open Source Software를 중점적으로 연구하는 충북대학교 소프트웨어학부 소속 학술 동아리입니다.
                            </p>
                            <p>
                                Linux의 응용과 실습을 바탕으로 OSS를 이해하고, 활용할 능력을 갖추는 걸 목표로 하고 있습니다.
                            </p>
                            <p>
                                TUX에서는 Linux에 대한 연구, 나아가서 RedHat Certified 자격증 취득 및 공모전 활동을 통한 오픈소스의 활용 경험 축적을 도모합니다.
                                또한, 프로그래밍 언어 스터디, 알고리즘 스터디 등 스터디 활동을 통해 개인 능력 향상과 학술 교류를 노력하고 있습니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-justify flex flex-col gap-2">
                    <div className="text-left w-fit py-2 px-4 border-b-2 border-black font-bold">주요 활동</div>
                    <div className="px-3">Linux 연구 및 스터디, OSS를 활용한 프로그래밍 언어 스터디, 알고리즘 스터디, 웹사이트 및 서버 개발, 공모전 및 대회 참가</div>
                </div>

                <div className="mt-20 text-justify flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                        <div className="text-left w-fit py-2 px-4 border-b-2 border-black font-bold">공개한 오픈소스 프로젝트</div>
                        <span className="underline text-xl text-slate-500 hover:animate-pulse hover:scale-110 transition duration-300 ease-in-out">
                            <a href="https://github.com/orgs/CBNU-TUX/repositories" target="_blank" rel="noreferrer">more ◹</a>
                        </span>
                    </div>
                    <ul>
                        {
                            projects.map((ele) => <OSSProjects key={ele.id} props={ele} />)
                        }
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Tuxinfo01;