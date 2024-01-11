import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';


function AdministratorPage() {
    const navigate = useNavigate();

    const [waitingList, setWaitingList] = useState();
    const [memberList, setMemberList] = useState();

    useEffect(() => {
        loadWaitingList();
        loadMemeberList();
    }, []);

    async function loadWaitingList() {
        const res = await fetch("/api/admin/user/waiting", {
            credentials: 'include',
        });
        let waitings = await res.json();
        waitings = waitings.map((w) => { return { ...w, newUserRole: 'USER' } });
        setWaitingList(waitings);
    }

    function handleGuestRoleSelect(id, role) {
        let newWaitings = waitingList.map((w) => { return (w.id === id) ? { ...w, newUserRole: role } : w });
        setWaitingList(newWaitings);
    }

    async function changeUserRole(id, role) {
        const res = await fetch(`/api/admin/user/${id}/role/${role}`, {
            method: "POST",
            credentials: 'include'
        });
        if (res.ok) {
            navigate(0);
        } else {
            alert('회원 등급 변경 중 오류가 발생하였습니다.');
        }
    }


    async function loadMemeberList() {
        const res = await fetch("/api/admin/user/member", {
            credentials: 'include',
        });
        let members = await res.json();
        members = members.map((m) => { return { ...m, newUserRole: m.role } });
        setMemberList(members);
    }

    function handleMemberRoleSelect(id, role) {
        let newMembers = memberList.map((m) => { return (m.id === id) ? { ...m, newUserRole: role } : m });
        setMemberList(newMembers);
    }


    async function changePassword(id) {
        const newPassword = prompt("변경할 비밀번호를 입력하세요.");
        const userpwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/

        if (!userpwRegex.test(newPassword)) {
            alert('비밀번호는 영문자와 숫자를 포함하여 8자 이상이어야 합니다.');
            return;
        }

        if (newPassword) {
            const res = await fetch(`/api/admin/user/${id}/password/${newPassword}`, {
                method: "PUT",
                credentials: 'include'
            });
            if (res.ok) {
                navigate(0);
            } else {
                alert('비밀번호 변경 중 오류가 발생하였습니다.');
            }
        }
    }

    async function banUser(id) {
        if (window.confirm("정말로 로그인할 수 없도록 설정하시겠습니까?\n(해제시 직접 DB 수정 필요)")) {
            const res = await fetch(` /api/admin/user/${id}/ban`, {
                method: "DELETE",
                credentials: 'include'
            });
            if (res.ok) {
                navigate(0);
            } else {
                alert('로그인 금지 설정 중 오류가 발생하였습니다.');
            }
        }
    }



    return (
        <div className='min-h-screen xl:p-20 px-3 py-10'>
            <div>
                <div className='text-5xl font-black'>회원 관리</div>
                <div className="text-lg">CBNU TUX</div>
            </div>

            {/* 승인 대기자 */}
            <div className="mt-20 mx-auto xl:w-[70%] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-32 mx-auto text-center">
                        <span className="box-border text-xl">승인 대기자</span>
                    </div>
                </div>

                <form className="mt-5">
                    <table className="w-full border-separate border-2 text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2">아이디</th>
                                <th>학번</th>
                                <th>닉네임</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>삭제 여부</th>
                                <th>회원 등급 변경</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                waitingList && waitingList.map((ele) =>
                                    <tr key={ele.id}>
                                        <td className="py-2">{ele.username}</td>
                                        <td>{ele.studentNumber}</td>
                                        <td>{ele.nickname}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.phoneNumber}</td>
                                        <td>{(ele.banned) ? "ban" : ele.deleted+""}</td>
                                        <td className="w-24 py-2">
                                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full my-1 p-2.5"
                                                value={ele.newUserRole} onChange={(e) => { handleGuestRoleSelect(ele.id, e.target.value) }}>
                                                <option value="USER">USER</option>
                                                <option value="MANAGER">MANAGER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 w-full my-1 inline-block"
                                                onClick={() => { changeUserRole(ele.id, ele.newUserRole) }}>
                                                변경
                                            </button>
                                            <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 w-full my-1 inline-block"
                                                onClick={(e) => { e.preventDefault(); changePassword(ele.id) }}>
                                                비밀번호변경
                                            </button>
                                            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 w-full my-1 inline-block"
                                                onClick={(e) => { e.preventDefault(); banUser(ele.id) }}>
                                                로그인 밴
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </form>
            </div>

            {/* 멤버(기가입자) 관리 */}
            <div className="mt-20 mx-auto xl:w-[70%] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-28 mx-auto text-center">
                        <span className="box-border text-xl">회원 관리</span>
                    </div>
                </div>

                <div style={{ display: 'none' }} className="px-5 mt-5 text-left">
                    <div className="flex gap-3">
                        <span>
                            <form>
                                <input type="text"
                                    name=""
                                    placeholder="회원 검색"
                                    className="border border-x-gray-300 rounded px-2 py-1 w-72
                                    focus:outline-none focus:ring focus:ring-[#E95420]" />
                            </form>
                        </span>
                        <span>
                            <button type="button" className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-sm">검색</button>
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">* 학번, 이름, 아이디, 이메일, 전화번호로 특정 회원을 검색할 수 있습니다.</p>
                </div>

                <form className="mt-5">
                    <table className="w-full border-separate border-2 text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2">아이디</th>
                                <th>회원 등급</th>
                                <th>학번</th>
                                <th>닉네임</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>삭제 여부</th>
                                <th>회원 등급 변경</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                memberList && memberList.map((ele) =>
                                    <tr key={ele.id}>
                                        <td className="py-2">{ele.username}</td>
                                        <td>{ele.role}</td>
                                        <td>{ele.studentNumber}</td>
                                        <td>{ele.nickname}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.phoneNumber}</td>
                                        <td>{(ele.banned) ? "ban" : ele.deleted+""}</td>
                                        <td className="w-24 py-2">
                                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full my-1 p-2.5"
                                                value={ele.newUserRole} onChange={(e) => { handleMemberRoleSelect(ele.id, e.target.value) }}>
                                                <option value="GUEST">GUEST</option>
                                                <option value="USER">USER</option>
                                                <option value="MANAGER">MANAGER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>
                                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 w-full my-1 inline-block"
                                                onClick={() => { changeUserRole(ele.id, ele.newUserRole) }}>
                                                변경
                                            </button>
                                            <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2 w-full my-1 inline-block"
                                                onClick={(e) => { e.preventDefault(); changePassword(ele.id) }}>
                                                비밀번호변경
                                            </button>
                                            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 w-full my-1 inline-block"
                                                onClick={(e) => { e.preventDefault(); banUser(ele.id) }}>
                                                로그인 밴
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default AdministratorPage;