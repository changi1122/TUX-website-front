import { useState } from "react";
import { useEffect } from 'react';
import Markable from '../../components/Markable';
import { Link } from 'react-router-dom';

function JoinPage() {

    const [md, setMd] = useState();
    
    useEffect(() => {
        fetch('/api/staticpage/joinForm').then((response) => response.json()).then((json) => {
            setMd(decodeURI(json.body));
          })
    }, [])

    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full pb-20 ani-fadein-up relative">
                <div className="text-lg">지원하기</div>
                <div className="text-4xl font-bold">부원 모집</div>
                <div className='absolute bottom-0 w-full m-[-1px]'>
                    <div className="inline-flex w-full max-w-xs shadow-sm" role="group">
                        <Link to={"/join"}
                            className="flex-1 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
                            부원 모집
                        </Link>
                        <Link  to={"/contact"}
                            className="flex-1 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
                            연락처
                        </Link>
                    </div>
                </div>
            </div>

            <div className="md mt-20 text-left md:px-[20vw] px-0">
                <Markable md={md} />
            </div>
        </div >
    );
}

export default JoinPage;