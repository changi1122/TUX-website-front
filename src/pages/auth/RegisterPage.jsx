import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import { callSignupAPI, checkUsernameDuplicationAPI } from "../../apis/UserAPI";


function RegisterPage() {
    const navigate = new useNavigate();

    // 아이디, 학번, 이름, 비밀번호, 이메일, 전화번호
    const [username, setUsername] = useState('');
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // 오류메시지 상태 저장
    const [usernameMessage, setUsernameMessage] = useState('');
    const [studentIdMessage, setStudentIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    // 유효성 검사
    const [isUsername, setIsUsername] = useState(false); // 정규식 확인
    const [isUsableId, setIsUsableId] = useState(false); // 중복 확인
    const [isStudentId, setIsStudentId] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordCheck, setIsPasswordCheck] = useState(false);
    const [isEmail, setIsEmail] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const result = await callSignupAPI({
            username,
            password,
            nickname: name,
            email,
            phoneNumber: phone,
            department: '소프트웨어학부',
            studentNumber: studentId
        });

        if (result.success) {
            navigate('/signup/successful');
        } else {
            alert(result.message);
        }
    };

    // username 중복 확인
    const checkUsername = async (username) => {
        const result = await checkUsernameDuplicationAPI(username);

        if (result.success) {
            if (result.isDuplicated) {
                setIsUsableId(false);
                setUsernameMessage('이미 사용 중인 아이디 입니다.');
            } else {
                setIsUsableId(true);
                setUsernameMessage('✅ 사용 가능한 아이디 입니다.');
            }
        }
        else {
            console.error(result.message);
        }
    };

    // username
    const onChangeUsername = useCallback((e) => {
        const usernameRegex = /^[A-Za-z0-9_]{4,}$/
        const usernameCurrent = e.target.value;
        setUsername(usernameCurrent);

        if (!usernameRegex.test(usernameCurrent)) {
            setIsUsername(false);
            setUsernameMessage('아이디는 영문자와 숫자의 조합으로 4자 이상 작성해야 합니다.');
        }
        else {
            setIsUsername(true);
            setUsernameMessage('아이디 중복 확인을 부탁드립니다.');
        }
    }, [])


    // student id(학번)
    const onChangeStudentId = useCallback((e) => {
        const studentIdRegex = /^(?=.*[0-9]).{2,20}$/
        const studentIdRegex2 = /^(?=.*[^0-9]).{2,20}$/
        const studentIdCurrent = e.target.value;
        setStudentId(studentIdCurrent);

        if (!studentIdRegex.test(studentIdCurrent) || studentIdRegex2.test(studentIdCurrent)) {
            setStudentIdMessage('올바른 학번 형식이 아닙니다.');
            setIsStudentId(false);
        }
        else {
            setStudentIdMessage('');
            setIsStudentId(true);
        }
    }, [])

    const onChangePassword = useCallback((e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/
        const passwordCurrent = e.target.value;
        setPassword(passwordCurrent);

        if (!passwordRegex.test(passwordCurrent)) {
            setPasswordMessage('비밀번호는 영문자와 숫자를 포함하여 8자 이상이어야 합니다.');
            setIsPassword(false);
        } else {
            setPasswordMessage('');
            setIsPassword(true);
        }
    }, [])

    const onChangePasswordCheck = useCallback((e) => {
        const passwordCheckCurrent = e.target.value;
        setPasswordCheck(passwordCheckCurrent);

        if (password === passwordCheckCurrent) {
            setPasswordCheckMessage('');
            setIsPasswordCheck(true);
        } else {
            setPasswordCheckMessage('입력하신 비밀번호와 일치하지 않습니다.');
            setIsPasswordCheck(false);
        }
    }, [password])

    // 이메일
    const onChangeEmail = useCallback((e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value;
        setEmail(emailCurrent);

        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('올바른 이메일 형식이 아닙니다.');
            setIsEmail(false);
        } else {
            setEmailMessage('');
            setIsEmail(true);
        }
    }, [])

    const onChangePhone = useCallback((e) => {
        const phoneCurrent = e.target.value;
        setPhone(phoneCurrent);
    }, [])

    return (
        <div className='min-h-screen md:p-20 px-3 py-10'>
            <div>
                <div className='text-5xl font-black'>CBNU TUX</div>
                <div className="text-lg">TUX에 오신 것을 환영합니다</div>
            </div>

            <div className="mt-10 mx-auto md:w-[370px] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-20 mx-auto text-center">
                        <span className="box-border">회원가입</span>
                    </div>
                </div>

                <div className="text-sm text-start mt-10">
                    <span className="text-[#E95420]">*</span> 는 필수 입력 사항입니다.
                </div>

                {/* form */}
                <form className="mt-3"
                    onSubmit={(e) => { onSubmit(e) }}>

                    <div className="relative">
                        <button type="button"
                            className="absolute top-[0.25em] right-[1.9em] bg-gray-100 hover:bg-gray-200 rounded border-2 px-3 py-1
                            disabled:opacity-50 disabled:hover:bg-gray-100"
                            onClick={(e) => { checkUsername(username) }}
                            disabled={!isUsername} >
                            확인
                        </button>
                    </div>
                    <label>
                        <input type="text"
                            name="username"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%]
                                focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeUsername(e); }}
                            placeholder="아이디 (영문자 숫자 4자 이상)"
                            autoFocus />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{usernameMessage}</div>
                    </label>

                    <label>
                        <input type="text"
                            name="studentId"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeStudentId(e); }}
                            placeholder="학번 (20XXXXXXXX)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{studentIdMessage}</div>
                    </label>
                    <label>
                        <input type="text"
                            name="name"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { setName(e.target.value); }}
                            placeholder="이름 (18학번 홍길동)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                    </label>

                    <label>
                        <input type="password"
                            name="password"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-9
                        focus:outline-none focus:ring focus:ring-[#E95420] text-black"
                            style={{
                                // 일부 환경에서 비밀번호 입력시 입력된 내용이 안 보이는 문제 해결
                                fontFamily: '"Apple SD Gothic Neo", Apple SD Gothic Neo, -apple-system, BlinkMacSystemFont, Malgun Gothic, "돋움", dotum, arial, sans-serif'
                            }}
                            onChange={(e) => { onChangePassword(e); }}
                            placeholder="비밀번호 (영문 숫자 포함 8자 이상)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{passwordMessage}</div>
                    </label>
                    <label>
                        <input type="password"
                            name="passwordCheck"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420] text-black"
                            style={{
                                // 일부 환경에서 비밀번호 입력시 입력된 내용이 안 보이는 문제 해결
                                fontFamily: '"Apple SD Gothic Neo", Apple SD Gothic Neo, -apple-system, BlinkMacSystemFont, Malgun Gothic, "돋움", dotum, arial, sans-serif'
                            }}
                            onChange={(e) => { onChangePasswordCheck(e); }}
                            placeholder="비밀번호 확인" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{passwordCheckMessage}</div>
                    </label>

                    <div>
                        <input type="email"
                            name="email"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-9
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeEmail(e); }}
                            placeholder="이메일" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{emailMessage}</div>
                    </div>
                    <div>
                        <input type="tel"
                            name="tel"
                            className="border border-x-gray-300 rounded px-4 py-2 w-full mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangePhone(e); }}
                            placeholder="전화번호" />
                    </div>

                    {/* 버튼 */}
                    <button
                        type="submit"
                        className="bg-gray-100 hover:bg-gray-200 rounded py-2 w-full mt-6
                        disabled:opacity-50 disabled:hover:bg-gray-100"
                        disabled={!(isUsableId && isStudentId && isPassword && isPasswordCheck && isEmail)} >
                        회원가입
                    </button>
                    <div className="text-xs mt-3 justify-center flex">
                        <div className="mr-1">이미 계정이 있으신가요?</div>
                        <a href="/login" className="text-[#E95420] hover:underline" >로그인</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;