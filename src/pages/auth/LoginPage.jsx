import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from 'react-router-dom';

import { login } from "../../apis/UserAPI";

function LoginPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // 아이디, 비밀번호
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepAuth, setKeepAuth] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const result = await login({
            username,
            password,
            keepAuth
        });

        if (result.success) {
            // 로그인 성공
            const redirectTo = searchParams.get('from');
            navigate(redirectTo || '/', { replace: true });
        } else {
            alert(result.message);
        }
    };

    // username
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    // password
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    // 로그인 상태 유지
    const onChangeKeepAuth = (e) => {
        setKeepAuth(e.target.checked);
    };

    return (
        <div className='min-h-screen md:p-20 px-3 py-10'>
            <div>
                <div className='text-5xl font-black'>CBNU TUX</div>
                <div className="text-lg">Linux & OSS Club, since 2020</div>
            </div>

            <div className="mt-10 mx-auto md:w-[300px] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-20 mx-auto text-center">
                        <span className="box-border">로그인</span>
                    </div>
                </div>

                <form className="mt-10"
                    onSubmit={onSubmit}>
                    <input type="text"
                        name="userid"
                        className="border border-x-gray-300 rounded px-4 py-2 w-full
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                        onChange={onChangeUsername}
                        placeholder="아이디"
                        autoFocus />
                    <input type="password"
                        name="userpw"
                        className="border border-x-gray-300 rounded px-4 py-2 w-full mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420] text-black"
                        style={{
                            // 일부 환경에서 비밀번호 입력시 입력된 내용이 안 보이는 문제 해결
                            fontFamily: '"Apple SD Gothic Neo", Apple SD Gothic Neo, -apple-system, BlinkMacSystemFont, Malgun Gothic, "돋움", dotum, arial, sans-serif'
                        }}
                        onChange={onChangePassword}
                        placeholder="비밀번호" />
                    <button className="bg-gray-100 hover:bg-gray-200 rounded py-2 w-full mt-6">
                        로그인
                    </button>
                    <div className="text-xs mt-3 justify-between flex">
                        <label>
                            <input type="checkbox" name="keepAuth"
                                className="mr-1 translate-y-[1.8px]
                                checked:accent-black"
                                checked={keepAuth}
                                onChange={onChangeKeepAuth}/>
                            로그인 상태 유지
                        </label>
                        <div className="flex gap-4">
                            <a href="/contact" className="hover:text-[#E95420]" >ID/PW 찾기</a>
                            <a href="/signup" className="hover:text-[#E95420]" >회원가입</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
