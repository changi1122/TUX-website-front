import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Page = (props) => {
    const {pageId} = useParams();
    const navigate = useNavigate();
    return (
        <>
            <h3>{pageId}번 페이지</h3>
            <div>
                <div onClick={() => navigate(-1)}>뒤로 가기</div>
                <div onClick={() => navigate(1)}>앞으로 가기</div>
                <div onClick={() => navigate('/')}>메인으로</div>
            </div>
        </>
        
    );
}

export default Page;