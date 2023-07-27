import { useState } from "react";
import { ApplyMD } from '../../static/markdowns';
import { useEffect } from 'react';
import Markable from '../../components/Markable';

function JoinPage() {

    const [md, setMd] = useState();
    
    useEffect(() => {
        fetch(ApplyMD).then((response) => response.text()).then((text) => {
            setMd(text);
          })
    }, [])

    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full md:pb-20 pb-10 ani-fadein-up">
                <div className="text-lg">지원하기</div>
                <div className="text-4xl font-bold">부원 모집</div>
            </div>

            <div className="md mt-20 text-left md:px-[20vw] px-0">
                <Markable md={md} />
            </div>
        </div >
    );
}

export default JoinPage;