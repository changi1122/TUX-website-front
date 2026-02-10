
function ReferenceRoomRule() {

    return (
        <div className='mt-16 text-slate-400 break-keep select-none'>
            <h4 style={{ fontWeight: 'bold' }}>자료실 이용방법</h4>
            <div className='mt-4 text-xs pr-4'>
                <p>자료실은 &apos;강의/스터디&apos;, &apos;학습 자료&apos;, &apos;갤러리&apos;로 3가지 카테고리가 있으며,
                    갤러리를 제외한 자료는 <strong>동아리 부원으로 인증받은 사람</strong>만 볼 수 있습니다.</p>
                <p>자료실에 게시글을 올리거나, 댓글을 달려면 &apos;USER&apos;나 &apos;MANAGER&apos;, &apos;ADMIN&apos; 권한을 가진 계정으로 로그인을 해야 합니다.
                    계정 권한은 최고 관리자 권한인 &apos;ADMIN&apos; 계정으로 로그인하여 변경할 수 있습니다.</p>
                <p>시험 정보는 학습에 도움받는 용도로만 사용합시다.</p>
            </div>
        </div>
    );
}

export default ReferenceRoomRule;