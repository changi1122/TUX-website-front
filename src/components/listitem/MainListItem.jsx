import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const MainListItem = ({ post, isGallery }) => {
    return (
        <Link key={post.id} to={(isGallery ? "/gallery/" : "/community/") + post.id} className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <span className={badge(post.category)[0] + " text-xs font-medium rounded mr-2 mb-1 px-2.5 py-1 inline-block"}>{badge(post.category)[1]}</span>
        <h3 className="my-1 text-md font-bold tracking-tight text-gray-900" style={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
            {post.title}
        </h3>
        <div>
            <span className='text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>📅</span> {dayjs(post.createdDate).format('YYYY-MM-DD')}</span>
            <span className='text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>👀</span> {post.view}</span>
            { post.likes != 0 &&
              <span className='text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>👍</span>{post.likes}</span>
            }
            { post.comment != 0 &&
              <span className='text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>💬</span>{post.comment}</span>
            }
        </div>
      </Link>
    );
};

function badge(category) {
    switch(category) {
        case 'NOTICE':
            return ['bg-green-100 text-green-800', '공지사항'];
        case 'TEAMRECRUITMENT':
            return ['bg-pink-100 text-pink-800', '팀원 모집'];
        case 'CONTEST':
            return ['bg-yellow-100 text-yellow-800', '대회/공모전'];
        case 'JOB':
            return ['bg-red-100 text-red-800', '채용/취업 정보'];
        case 'STUDY':
            return ['bg-red-100 text-red-800', '강의/스터디'];
        case 'GALLERY':
            return ['bg-yellow-100 text-yellow-800', '갤러리'];
        case 'EXAM':
            return ['bg-purple-100 text-purple-800', '시험정보'];
        default:
            return ['bg-purple-100 text-purple-800', '자유게시판'];
    }
}

export default MainListItem;