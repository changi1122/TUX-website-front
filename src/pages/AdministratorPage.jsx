import { useState } from "react";

const waitingDummy = [
    {
        "id": "waitingID",
        "student_num": "2020waiting",
        "name": "김기다림",
        "email": "waiting@waiting.com",
        "phone_num": "010-wait-ting"
    },
    {
        "id": "plzApprovID",
        "student_num": "2023plzApprov",
        "name": "이승인",
        "email": "plz@approv.net",
        "phone_num": "010-plea-seap"
    }
]

const menberDummy = [
    {
        "id": "dummyID",
        "student_num": "2020dummmy",
        "name": "김더미",
        "email": "dummy@dummy.com",
        "phone_num": "010-dumm-mmmy"
    },
    {
        "id": "testID",
        "student_num": "2023tetest",
        "name": "이테스트",
        "email": "test@test.net",
        "phone_num": "010-test-test"
    }
]

function AdministratorPage() {
    const [waitingList, setWaitingList] = useState(waitingDummy);
    const [menberList, setMenberList] = useState(menberDummy);

    return (
        <div className='min-h-screen xl:p-20 px-3 py-10'>
            <div>
                <div className='text-5xl font-black'>Admin</div>
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
                                <th>이름</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>거부 / 승인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                waitingList.map((ele) =>
                                    <tr>
                                        <td className="py-2">{ele.id}</td>
                                        <td>{ele.student_num}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.phone_num}</td>
                                        <td className="w-24 py-2">
                                            <button type="button" className="p-2 mx-1 bg-red-700 hover:bg-red-900 rounded-sm text-xs text-white">거부</button>
                                            <button type="button" className="p-2 mx-1 bg-gray-100 hover:bg-gray-200 rounded-sm text-xs">승인</button>
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

                <div className="px-5 mt-5 text-left">
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
                                <th>학번</th>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menberList.map((ele) =>
                                    <tr>
                                        <td className="py-2">{ele.id}</td>
                                        <td>{ele.student_num}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.phone_num}</td>
                                        <td className="w-20">
                                            <button type="button" className="p-2 m-1 bg-rose-500 hover:bg-rose-700 rounded-sm text-xs text-white">활동 정지</button>
                                            <button type="button" className="p-2 m-1 bg-red-700 hover:bg-red-900 rounded-sm text-xs text-white">강제 탈퇴</button>
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