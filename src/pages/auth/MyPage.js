import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function MyPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        "id": "-1",
        "username": "",
        "nickname": "",
        "role": "",
        "email": "",
        "department": "",
        "studentNumber": "",
        "phoneNumber": "",
    });

    useEffect(() => {
        getCurrentUser();
    }, []);

    async function getCurrentUser() {
        const res = await fetch('/api/auth', {
            credentials: 'include'
        });
        setUser(await res.json());
    }

    function handleChangePassword() {
        const newPassword = prompt("변경할 비밀번호를 입력하세요.");
        const userpwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/

        if (!userpwRegex.test(newPassword)) {
            alert('비밀번호는 영문자와 숫자를 포함하여 8자 이상이어야 합니다.');
            return;
        }

        if (newPassword) {
            updateUser('password', newPassword);
        }
    }

    function handleChangeNickname() {
        const newNickname = prompt("변경할 닉네임을 입력하세요. (예시: 18학번 홍길동)");

        if (newNickname) {
            updateUser('nickname', newNickname);
        }
    }

    function handleChangeEmail() {
        const newEmail = prompt("변경할 이메일 주소를 입력하세요.");
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

        if (!emailRegex.test(newEmail)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        if (newEmail) {
            updateUser('email', newEmail);
        }
    }

    function handleChangePhoneNumber() {
        const newPhone = prompt("변경할 전화번호를 입력하세요.");

        if (newPhone) {
            updateUser('phoneNumber', newPhone);
        }
    }

    function handleChangeDepartment() {
        const newDepartment = prompt("변경할 학과(학부)를 입력하세요.");

        if (newDepartment) {
            updateUser('department', newDepartment);
        }
    }

    async function updateUser(name, value) {
        let body = {};
        body[name] = value;

        const res = await fetch(`/api/user/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(
                body
            ),
            credentials: 'include',
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            navigate(0);
        } else {
            alert('회원 정보 변경 중 오류가 발생하였습니다.');
        }
    }

    return (
        <div className='min-h-screen mx-auto lg:w-[936px] w-full text-left px-3 md:pt-10 md:pb-20 pt-5 pb-10'>
            <h2 className='text-2xl mb-4'>마이페이지</h2>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">아이디</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={user.username} disabled readonly/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">비밀번호</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="BCrypt 해싱으로 암호화되어 저장됨" disabled readonly/>
                        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full my-1 inline-block"
                            onClick={(e) => { e.preventDefault(); handleChangePassword(); }}>
                            비밀번호변경
                        </button>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">닉네임</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={user.nickname} disabled readonly/>
                        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full my-1 inline-block"
                            onClick={(e) => { e.preventDefault(); handleChangeNickname(); }}>
                            닉네임 변경
                        </button>
                    </div>  
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">회원 권한</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={user.role} disabled readonly/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">이메일</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={user.email} disabled readonly/>
                        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full my-1 inline-block"
                            onClick={(e) => { e.preventDefault(); handleChangeEmail(); }}>
                            이메일 변경
                        </button>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">전화번호</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={user.phoneNumber} disabled readonly/>
                        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full my-1 inline-block"
                            onClick={(e) => { e.preventDefault(); handleChangePhoneNumber(); }}>
                            전화번호 변경
                        </button>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">학과</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={user.department} disabled readonly/>
                        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full my-1 inline-block"
                            onClick={(e) => { e.preventDefault(); handleChangeDepartment(); }}>
                            학과 변경
                        </button>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">학번</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={user.studentNumber} disabled readonly/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MyPage;