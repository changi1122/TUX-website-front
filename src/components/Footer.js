import { useEffect, useState } from "react";

function Footer(props) {
    return (
        <div className={`w-full flex justify-center bg-[#efefef] mt-auto`}>
            <div className="w-[90%] flex justify-between items-center py-2">
                <div className="flex items-center gap-[1em]">
                    <div>&copy; CBNU TUX</div>
                    <div className="text-xs">개인정보 처리방침</div>
                </div>
                <div>
                    <div>관련사이트 ↷</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;