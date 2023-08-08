import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function RegisterPage() {
    const navigate = new useNavigate();

    // 아이디, 학번, 이름, 비밀번호, 이메일, 전화번호
    const [userid, setUserid] = useState('');
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [userpw, setUserpw] = useState('');
    const [userpwCheck, setUserpwCheck] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // 오류메시지 상태 저장
    const [useridMessage, setUseridMessage] = useState('');
    const [studentIdMessage, setStudentIdMessage] = useState('');
    const [userpwMessage, setUserpwMessage] = useState('');
    const [checkpwMessage, setCheckpwMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    // 유효성 검사
    const [isUserid, setIsUserid] = useState(false); // 정규식 확인
    const [isUsableId, setIsUsableId] = useState(false); // 중복 확인
    const [isStudentId, setIsStudentId] = useState(false);
    const [isUserpw, setIsUserpw] = useState(false);
    const [isCheckpw, setIsCheckpw] = useState(false);
    const [isEmail, setIsEmail] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/user', {
            username: userid,
            password: userpw,
            email: email,
            nickname: name,
            department: '소프트웨어학부',
            studentNumber: studentId,
            phoneNumber: phone,
        })
            .then(response => {
                // 회원가입 성공
                navigate('/signup/successful');
            })
            .catch((err) => {
                console.warn(err.message);
                alert('회원가입에 실패하였습니다. 다시 시도해 주세요.\n\nError message:\n' + err.response.data.message);
                navigate('/signup');
            });
    };

    // userid 중복 확인
    const dupleIdCheck = async (userid) => {
        try {
            const res = await axios.get(`/api/user/check/username?username=${userid}`);
        
            if (res.data && isUserid === true) {
                setIsUsableId(true);
                setUseridMessage('✅ 사용 가능한 아이디 입니다.');
            } else {
                setIsUsableId(false);
                setUseridMessage('이미 사용 중인 아이디 입니다.');
            }
        } catch (err) {
            console.warn(err.message);
        }
    };

    // userid
    const onChangeUserid = useCallback((e) => {
        const useridRegex = /^[A-Za-z0-9_]{4,}$/
        const useridCurrent = e.target.value;
        setUserid(useridCurrent);

        if (!useridRegex.test(useridCurrent)) {
            setIsUserid(false);
            setUseridMessage('아이디는 영문자와 숫자의 조합으로 4자 이상 작성해야 합니다.');
        }
        else {
            setIsUserid(true);
            setUseridMessage('아이디 중복 확인을 부탁드립니다.');
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

    const onChangeUserpw = useCallback((e) => {
        const userpwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/
        const userpwCurrent = e.target.value;
        setUserpw(userpwCurrent);

        if (!userpwRegex.test(userpwCurrent)) {
            setUserpwMessage('비밀번호는 영문자와 숫자를 포함하여 8자 이상이어야 합니다.');
            setIsUserpw(false);
        } else {
            setUserpwMessage('');
            setIsUserpw(true);
        }
    }, [])

    const onChangeCheckpw = useCallback((e) => {
        const checkpwCurrent = e.target.value;
        setUserpwCheck(checkpwCurrent);

        if (userpw === checkpwCurrent) {
            setCheckpwMessage('');
            setIsCheckpw(true);
        } else {
            setCheckpwMessage('입력하신 비밀번호와 일치하지 않습니다.');
            setIsCheckpw(false);
        }
    }, [userpw])

    // 이메일
    const onChangeEmail = useCallback((e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value;
        setEmail(emailCurrent);

        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('올바른 이메일 형식이 아닙니다.');
            setIsEmail(false);
            // if (emailCurrent === '') { // 필수 입력란이 아니므로.. -> 23. 3. 14. 필수 입력란으로 변경
            //     setEmailMessage('');
            //     setIsEmail(true);
            // }
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
                            onClick={(e) => { dupleIdCheck(userid) }}
                            disabled={!isUserid} >
                            확인
                        </button>
                    </div>
                    <lebel>
                        <input type="text"
                            name="userid"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%]
                                focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeUserid(e); }}
                            placeholder="아이디 (영문자 숫자 4자 이상)"
                            autoFocus />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{useridMessage}</div>
                    </lebel>

                    <lebel>
                        <input type="text"
                            name="studentId"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeStudentId(e); }}
                            placeholder="학번 (20XXXXXXXX)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{studentIdMessage}</div>
                    </lebel>
                    <lebel>
                        <input type="text"
                            name="name"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { setName(e.target.value); }}
                            placeholder="이름 (18학번 홍길동)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                    </lebel>

                    <lebel>
                        <input type="password"
                            name="userpw"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-9
                        focus:outline-none focus:ring focus:ring-[#E95420] text-black"
                            onChange={(e) => { onChangeUserpw(e); }}
                            placeholder="비밀번호 (영문 숫자 포함 8자 이상)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{userpwMessage}</div>
                    </lebel>
                    <lebel>
                        <input type="password"
                            name="checkpw"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420] text-black"
                            onChange={(e) => { onChangeCheckpw(e); }}
                            placeholder="비밀번호 확인" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{checkpwMessage}</div>
                    </lebel>

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
                        disabled={!(isUsableId && isStudentId && isUserpw && isCheckpw && isEmail)} >
                        회원가입
                    </button>
                    <div className="text-xs mt-3 justify-center flex">
                        <div className="mr-1">이미 게정이 있으신가요?</div>
                        <a href={process.env.PUBLIC_URL + '/login'} className="text-[#E95420] hover:underline" >로그인</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;