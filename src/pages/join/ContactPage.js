import { useState } from "react";
import { ContactMD } from '../../static/markdowns';
import { useEffect } from 'react';
import Markable from '../../components/Markable';

function ContactPage() {

    const [md, setMd] = useState();
    
    useEffect(() => {
        fetch(ContactMD).then((response) => response.text()).then((text) => {
            setMd(text);
          })
    }, [])

    return (
        <div className='min-h-screen px-3 md:py-20 py-10'>
            <div className="border-b border-black w-full md:pb-20 pb-10 ani-fadein-up">
                <div className="text-lg">지원하기</div>
                <div className="text-4xl font-bold">연락처</div>
            </div>

            <div className="md mt-20 text-left md:px-[20vw] px-0">
                <Markable md={md} />
            </div>
        </div >
    );
}

export default ContactPage;