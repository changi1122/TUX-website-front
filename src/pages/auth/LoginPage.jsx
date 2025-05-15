import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function LoginPage(props) {
    const navigate = new useNavigate();

    // 아이디, 비밀번호
    const [userid, setUserid] = useState('');
    const [userpw, setUserpw] = useState('');
    const [keepAuth, setKeepAuth] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/auth', {
            username: userid,
            password: userpw,
        })
            .then(async response => {
                // 로그인 성공
                const res = await axios.get('/api/auth', {}, { withCredentials: true });

                if (keepAuth === true) {
                    // console.log('로그인 정보 유지할게요 -> localStorage')
                    localStorage.setItem('cbnu_tux_userid', res.data.id);
                    localStorage.setItem('userId', res.data.id);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('nickname', res.data.nickname);
                    localStorage.setItem('expire', new Date(new Date().setDate(new Date().getDate() + 7)));
                }
                else {
                    // console.log('로그인 정보 버려주세요 -> sessionStorage');
                    sessionStorage.setItem('cbnu_tux_userid', response.data.id);
                    sessionStorage.setItem('userId', res.data.id);
                    sessionStorage.setItem('username', res.data.username);
                    sessionStorage.setItem('role', res.data.role);
                    sessionStorage.setItem('nickname', res.data.nickname);
                }
                props.setIsLogin(true);
                navigate('/');
                navigate(0);
            })
            .catch((err) => {
                console.warn(err);
                alert('로그인에 실패하였습니다. 다시 시도해 주세요.\n\nError message:\n' + err.response.data.message);
                navigate('/login');
            });
    };

    // userid
    const onChangeUserid = (e) => {
        const useridCurrent = e.target.value;
        setUserid(useridCurrent);
    }

    // userpw
    const onChangeUserpw = (e) => {
        const userpwCurrent = e.target.value;
        setUserpw(userpwCurrent);
    }

    const onClickKeepAuth = () => {
        setKeepAuth(!keepAuth);
    }

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
                    onSubmit={(e) => { onSubmit(e) }}>
                    <input type="text"
                        name="userid"
                        className="border border-x-gray-300 rounded px-4 py-2 w-full
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                        onChange={(e) => { onChangeUserid(e); }}
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
                        onChange={(e) => { onChangeUserpw(e); }}
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
                                onClick={onClickKeepAuth}/>
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