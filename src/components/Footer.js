import { useState, useRef } from "react";
import { FaGithub } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import './style.css';

function Footer(props) {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div className={`w-full flex justify-center bg-[#efefef] mt-auto`}>
            <div className="w-[90%] flex justify-between items-center py-2">
                <div className="flex items-center gap-7 text-start text-xs">
                    <div>
                        <div className="text-sm">&copy; CBNU TUX</div>
                        <div>충청북도 청주시 서원구 충대로 1</div>
                        <div>전자정보대학 3관(S4-1) 108호 TUX</div>
                    </div>
                    <div>
                        <a href={process.env.PUBLIC_URL + '/sitemap'} className="text-base">사이트 맵</a>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div>
                        <div className="relative">
                            {/* position: relative; parent가 child의 기준점이 됨 */}
                            <button onClick={onClick} className="menu-trigger">
                                <div className="pr-[53.47px] mb-1">관련 사이트</div>
                                {
                                    isActive
                                        ? <FiLink size={20} color="gray" style={{ transition: 'all ease 0.5s 0s', transform: 'rotate(0deg)' }} />
                                        : <FiLink size={20} color="gray" style={{ transition: 'all ease 0.5s 0s', transform: 'rotate(45deg)' }} />
                                }
                            </button>
                            <nav
                                ref={dropdownRef}
                                className={`menu ${isActive ? 'active' : 'inactive'} text-sm`}
                            >
                                <ul>
                                    <li>
                                        <a href="https://www.chungbuk.ac.kr/" target="_blank">충북대학교</a>
                                    </li>
                                    <li>
                                        <a href="https://software.cbnu.ac.kr/" target="_blank">충북대학교<br></br>소프트웨어학부</a>
                                    </li>
                                    <li>
                                        <a href="https://sw7up.cbnu.ac.kr/" target="_blank">충북대학교<br></br>SW중심대학사업단</a>
                                    </li>
                                    <li>
                                        <a href="https://ece.cbnu.ac.kr/ECE" target="_blank">충북대학교<br></br>전자정보대학</a>
                                    </li>
                                    <li>
                                        <a href="https://cieat.chungbuk.ac.kr/" target="_blank">충북대학교 씨앗</a>
                                    </li>
                                    <li>
                                        <a href="https://cbnul.chungbuk.ac.kr/" target="_blank">충북대학교 도서관</a>
                                    </li>
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