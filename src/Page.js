import React from 'react';
import { useParams } from 'react-router-dom';

const Page = (props) => {
    const {pageId} = useParams();
    return (
        <>
            <h3>{pageId}번 페이지</h3>
        </>
    );
}

export default Page;