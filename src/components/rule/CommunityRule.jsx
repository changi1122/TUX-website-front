
function CommunityRule() {

    return (
        <div className='mt-16 text-slate-400 break-keep select-none'>
            <h4 style={{ fontWeight: 'bold' }}>커뮤니티 이용방법</h4>
            <div className='mt-4 text-xs pr-4'>
                <p>커뮤니티는 &apos;공지사항&apos;, &apos;팀원 모집&apos;, &apos;대회/공모전&apos;, &apos;채용/취업&apos;, &apos;자유게시판&apos;으로 5가지 카테고리가 있으며,
                    로그인하지 않은 사람까지 <strong>모든 사람</strong>이 볼 수 있습니다.</p>
                <p>커뮤니티의 게시글을 올리거나, 댓글을 달려면 회원가입 및 로그인을 해야 합니다.</p>
                <p>커뮤니티는 회원 등급과 상관 없이 사용할 수 있습니다.</p>
            </div>
        </div>
    );
}

export default CommunityRule;