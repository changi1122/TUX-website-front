import { useState } from "react";

function RegisterPage() {
    return (
        <div className='min-h-[83.99vh] p-20'>
            <div>
                <div className='text-5xl font-black'>CBNU TUX</div>
                <div className="text-lg">TUX에 오신 것을 환영합니다</div>
            </div>

            <div className="mt-10 mx-auto w-[300px]">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-20 mx-auto text-center">
                        <span className="box-border">회원가입</span>
                    </div>
                </div>

                <div className="text-sm text-start mt-10">
                    <span className="text-[#E95420]">*</span> 는 필수 입력 사항입니다.
                </div>

                <form className="mt-3"
                    onSubmit={() => { }}>
                    <lebel>
                        <input type="text"
                            name="userid"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%]
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { }}
                            placeholder="아이디(영문, 숫자 2-20자)"
                            autoFocus />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                    </lebel>
                    <lebel>
                        <input type="text"
                            name="name"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { }}
                            placeholder="이름" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                    </lebel>

                    <lebel>
                        <input type="password"
                            name="userpw"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-9
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { }}
                            placeholder="비밀번호(영문, 숫자, 특수문자 8-30자)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                    </lebel>
                    <lebel>
                        <input type="password"
                            name="checkpw"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { }}
                            placeholder="비밀번호 확인" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                    </lebel>

                    <input type="email"
                        name="email"
                        className="border border-x-gray-300 rounded px-4 py-2 w-full mt-9
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                        onChange={(e) => { }}
                        placeholder="이메일" />
                    <input type="tel"
                        name="tel"
                        className="border border-x-gray-300 rounded px-4 py-2 w-full mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                        onChange={(e) => { }}
                        placeholder="전화번호" />
                    <button className="bg-[#efefef] hover:bg-gray-200 rounded py-2 w-full mt-6">
                        회원가입
                    </button>
                    <div className="text-xs mt-3 justify-center flex">
                        <div className="mr-1">이미 게정이 있으신가요?</div>
                        <a href={process.env.PUBLIC_URL + '/register'} className="text-[#E95420] hover:underline" >회원가입</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;