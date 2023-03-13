import { useState } from "react";

function LoginPage() {
    return (
        <div className='min-h-screen md:p-20 px-3 py-10'>
            <div>
                <div className='text-5xl font-black'>CBNU TUX</div>
                <div className="text-lg">Linux study club, since 2020</div>
            </div>

            <div className="mt-10 mx-auto md:w-[300px] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-20 mx-auto text-center">
                        <span className="box-border">로그인</span>
                    </div>
                </div>

                <form className="mt-10"
                    onSubmit={() => { }}>
                    <input type="text"
                        name="userid"
                        className="border border-x-gray-300 rounded px-4 py-2 w-full
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                        onChange={(e) => { }}
                        placeholder="아이디"
                        autoFocus />
                    <input type="password"
                        name="userpw"
                        className="border border-x-gray-300 rounded px-4 py-2 w-full mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                        onChange={(e) => { }}
                        placeholder="비밀번호" />
                    <button className="bg-[#efefef] hover:bg-gray-200 rounded py-2 w-full mt-6">
                        로그인
                    </button>
                    <div className="text-xs mt-3 justify-between flex">
                        <label>
                            <input type="checkbox" name="keepAuth" value=""
                                className="mr-1 translate-y-[1.8px]
                                checked:accent-black" />
                            로그인 상태 유지
                        </label>
                        <div className="flex gap-4">
                            <a href={process.env.PUBLIC_URL + '/findAccount'} className="hover:text-[#E95420]" >ID/PW 찾기</a>
                            <a href={process.env.PUBLIC_URL + '/signup'} className="hover:text-[#E95420]" >회원가입</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;