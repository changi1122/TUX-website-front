import { useNavigate } from 'react-router';

function SuccessfulSignup() {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen md:p-20 px-3 py-10'>

            <div className="mt-20 mx-auto md:w-[600px] w-full">
                <div className="text-6xl">
                    환영합니다!
                </div>

                <p className='mt-10 text-3xl'>🎉</p>

                <div className="mt-10 text-lg text-left">
                    <p>귀하의 승인 요청이 대기열에 추가되었습니다.</p>
                    <p>승인 요청이 수락된 후에 정식으로 TUX의 회원으로서 활동하실 수 있습니다.</p>
                    <p>승인이 장시간 지연될 시, TUX 임원진에 문의 부탁드립니다.</p>
                </div>

                <button className="mt-32 bg-[#efefef] hover:bg-gray-200 rounded py-2 w-full"
                    onClick={() => navigate('/login')}>
                    로그인 페이지로 이동
                </button>
            </div>
        </div>
    );
}

export default SuccessfulSignup;