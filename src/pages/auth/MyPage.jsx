import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuthStore from '../../stores/useAuthStore';
import { useCurrentUser, useUpdateUser, useDeleteUser } from '../../queries/useUserQueries';
import { getApiErrorMessage } from '../../api/client';

const ROLES = ['GUEST', 'USER', 'MANAGER', 'ADMIN'];

function RoleSlider({ role }) {
    const currentIndex = ROLES.indexOf(role);
    return (
        <div className="flex-1 min-w-0 py-1">
            {/* 점 행 */}
            <div className="relative flex items-center justify-between h-3">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200" />
                {ROLES.map((r, i) => {
                    const isCurrent = i === currentIndex;
                    return (
                        <div key={r} className={`w-3 h-3 rounded-full border-2 z-10 ${isCurrent ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300'}`} />
                    );
                })}
            </div>
            {/* 라벨 행 */}
            <div className="flex justify-between mt-2">
                {ROLES.map((r, i) => {
                    const isCurrent = i === currentIndex;
                    return (
                        <span key={r} className={`text-xs font-medium ${isCurrent ? 'text-gray-900' : 'text-gray-300'}`}>
                            {r}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

function MyPage() {
    const navigate = useNavigate();

    const loginUser = useAuthStore();
    const { data: currentUser } = useCurrentUser();
    const updateUserMutation = useUpdateUser();
    const deleteUserMutation = useDeleteUser();

    useEffect(() => {
        if (currentUser) {
            useAuthStore.getState().getUser(currentUser);
        }
    }, [currentUser]);

    function handleChangePassword() {
        const newPassword = prompt("변경할 비밀번호를 입력하세요.");
        const userpwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/

        if (!userpwRegex.test(newPassword)) {
            alert('비밀번호는 영문자와 숫자를 포함하여 8자 이상이어야 합니다.');
            return;
        }

        if (newPassword) {
            handleUpdateUser('password', newPassword);
        }
    }

    function handleChangeNickname() {
        const newNickname = prompt("변경할 닉네임을 입력하세요. (예시: 18학번 홍길동)", loginUser.nickname);

        if (newNickname) {
            handleUpdateUser('nickname', newNickname);
        }
    }

    function handleChangeEmail() {
        const newEmail = prompt("변경할 이메일 주소를 입력하세요.", loginUser.email);
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

        if (!emailRegex.test(newEmail)) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        if (newEmail) {
            handleUpdateUser('email', newEmail);
        }
    }

    function handleChangePhoneNumber() {
        const newPhone = prompt("변경할 전화번호를 입력하세요.", loginUser.phoneNumber);

        if (newPhone) {
            handleUpdateUser('phoneNumber', newPhone);
        }
    }

    function handleChangeDepartment() {
        const newDepartment = prompt("변경할 학과(학부)를 입력하세요.", loginUser.department);

        if (newDepartment) {
            handleUpdateUser('department', newDepartment);
        }
    }

    async function handleUpdateUser(name, value) {
        try {
            await updateUserMutation.mutateAsync({
                userId: loginUser.userId,
                key: name,
                value: value
            });
            navigate(0);
        } catch (error) {
            alert(getApiErrorMessage(error));
        }
    }

    // 회원 탈퇴
    async function deleteUser() {
        if (window.confirm("정말로 회원 탈퇴하시겠습니까?")) {
            const typeUsername = prompt("회원 탈퇴하면 현재 사용 중인 아이디를 다시 사용할 수 없습니다.\n회원 탈퇴를 위해 현재 사용 중인 아이디를 입력하세요.");
            if (typeUsername === loginUser.username) {
                try {
                    await deleteUserMutation.mutateAsync(loginUser.userId);
                    navigate('/');
                    window.location.reload();
                } catch (error) {
                    alert(getApiErrorMessage(error));
                }
            } else {
                alert("입력하신 아이디가 일치하지 않습니다.");
            }
        }
    }

    return (
        <div className='min-h-screen mx-auto lg:w-[936px] w-full text-left px-3 md:pt-10 md:pb-20 pt-5 pb-10'>
            <div className="mb-8">
                <h2 className='text-2xl font-bold text-gray-900'>마이페이지</h2>
                <p className="text-sm text-gray-500 mt-1">계정 정보를 확인하고 수정할 수 있습니다.</p>
            </div>

            {/* 프로필 요약 카드 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 flex items-center gap-5">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <span className="text-2xl font-semibold text-gray-500 select-none">
                        {(() => { const s = loginUser.nickname || loginUser.username || '?'; return /^\d/.test(s) ? s.slice(0, 2) : s[0].toUpperCase(); })()}
                    </span>
                </div>
                <div>
                    <div className="font-semibold text-gray-900 text-lg leading-tight">{loginUser.nickname}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{loginUser.username}</div>
                    <span className="inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {loginUser.role}
                    </span>
                </div>
            </div>

            <form className="space-y-5">
                {/* 계정 정보 */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-3.5 border-b border-gray-100 bg-gray-50">
                        <h3 className="text-sm font-semibold text-gray-700">계정 정보</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <div className="px-6 py-4 flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-500 w-20 flex-shrink-0">아이디</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-0 flex-1 p-2.5"
                                value={loginUser.username} disabled readOnly />
                        </div>
                        <div className="px-6 py-4 flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-500 w-20 flex-shrink-0">비밀번호</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-0 flex-1 p-2.5"
                                placeholder="BCrypt 해싱으로 암호화되어 저장됨" disabled readOnly />
                            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 flex-shrink-0"
                                onClick={(e) => { e.preventDefault(); handleChangePassword(); }}>
                                변경
                            </button>
                        </div>
                    </div>
                </div>

                {/* 프로필 정보 */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-3.5 border-b border-gray-100 bg-gray-50">
                        <h3 className="text-sm font-semibold text-gray-700">프로필 정보</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <div className="px-6 py-4 flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-500 w-20 flex-shrink-0">닉네임</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-0 flex-1 p-2.5"
                                value={loginUser.nickname} disabled readOnly />
                            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 flex-shrink-0"
                                onClick={(e) => { e.preventDefault(); handleChangeNickname(); }}>
                                변경
                            </button>
                        </div>
                        <div className="px-6 py-4 flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-500 w-20 flex-shrink-0">학과</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-0 flex-1 p-2.5"
                                value={loginUser.department} disabled readOnly />
                            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 flex-shrink-0"
                                onClick={(e) => { e.preventDefault(); handleChangeDepartment(); }}>
                                변경
                            </button>
                        </div>
                        <div className="px-6 py-4 flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-500 w-20 flex-shrink-0">학번</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-0 flex-1 p-2.5"
                                value={loginUser.studentNumber} disabled readOnly />
                        </div>
                        <div className="px-6 py-4 flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-500 w-20 flex-shrink-0">회원 권한</label>
                            <RoleSlider role={loginUser.role} />
                        </div>
                    </div>
                </div>

                {/* 연락처 */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-3.5 border-b border-gray-100 bg-gray-50">
                        <h3 className="text-sm font-semibold text-gray-700">연락처</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        <div className="px-6 py-4 flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-500 w-20 flex-shrink-0">이메일</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-0 flex-1 p-2.5"
                                value={loginUser.email} disabled readOnly />
                            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 flex-shrink-0"
                                onClick={(e) => { e.preventDefault(); handleChangeEmail(); }}>
                                변경
                            </button>
                        </div>
                        <div className="px-6 py-4 flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-500 w-20 flex-shrink-0">전화번호</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-0 flex-1 p-2.5"
                                value={loginUser.phoneNumber} disabled readOnly />
                            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 flex-shrink-0"
                                onClick={(e) => { e.preventDefault(); handleChangePhoneNumber(); }}>
                                변경
                            </button>
                        </div>
                    </div>
                </div>

                {/* 데이터 삭제 */}
                <div className="bg-white border border-red-200 rounded-xl overflow-hidden">
                    <div className="px-6 py-3.5 border-b border-red-100 bg-red-50">
                        <h3 className="text-sm font-semibold text-red-600">데이터 삭제</h3>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between gap-4">
                        <div>
                            <div className="text-sm font-medium text-gray-900">회원 탈퇴</div>
                            <div className="text-xs text-gray-500 mt-0.5">탈퇴 후에는 현재 아이디를 다시 사용할 수 없습니다.</div>
                        </div>
                        <button className="text-red-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 flex-shrink-0"
                            onClick={(e) => { e.preventDefault(); deleteUser(); }}>
                            회원 탈퇴
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MyPage;
