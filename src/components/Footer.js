import { useState, useRef } from "react";
import { FaGithub } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import './style.css';
import { relatedSites } from "../static/jsons";

function Footer(props) {
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    const RelatedSites = ({ sites }) => {
        return (
            <li>
                <a href={sites.siteHref} target="_blank">
                    <table>
                        <tr>
                            <td className="pr-2 w-[25px]">
                                <img src={sites.siteIcon} />
                            </td>
                            <td>
                                {/* preformatted */}
                                <pre>{sites.siteTitle}</pre>
                            </td>
                        </tr>
                    </table>
                </a>
            </li>
        )
    }

    return (
        <div className={`w-full flex justify-center bg-[#efefef] mt-auto`}>
            <div className="w-[90%] flex justify-between items-center py-4
             md:flex-row flex-col gap-4">
                <div className="flex md:justify-start justify-between gap-2 items-center text-start text-xs md:w-auto w-full">
                    <div>
                        <div className="text-sm">&copy; CBNU TUX</div>
                        <div>충청북도 청주시 서원구 충대로 1</div>
                        <div>전자정보대학 3관(S4-1) 108호 TUX</div>
                    </div>
                    <div>
                        <a href={process.env.PUBLIC_URL + '/sitemap'} className="text-sm hover:bg-gray-200 px-[28px] py-[33px]">사이트 맵</a>
                    </div>
                </div>

                {/* 관련 사이트 목록 + 깃허브 링크 */}
                <div className="flex justify-end items-center gap-3 md:w-auto w-full">
                    <div>
                        <div className="relative">
                            {/* position: relative; parent가 child의 기준점이 됨 */}
                            <button onClick={onClick} className="site-trigger p-1 bg-white bg-opacity-50">
                                <div className="pr-[86.36px] mb-1 text-sm">관련 사이트</div>
                                {
                                    isActive
                                        ? <FiLink size={15} color="gray" style={{ transition: 'all ease 0.5s 0s', transform: 'rotate(45deg) translate(0, 5px)' }} />
                                        : <FiLink size={15} color="gray" style={{ transition: 'all ease 0.5s 0s', transform: 'rotate(0deg) translate(0, 4px)' }} />
                                }
                            </button>
                            <nav
                                className={`site ${isActive ? 'active' : 'inactive'} text-sm`}
                            >
                                <ul>
                                    {
                                        relatedSites.map((ele) => <RelatedSites key={ele.siteTitle} sites={ele} />)
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <a href="https://github.com/CBNU-TUX" target="_blank">
                        <FaGithub size={30} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;