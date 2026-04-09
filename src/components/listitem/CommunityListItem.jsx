import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

function CommunityListItem({ post, viewMode='list' }) {
    if (viewMode === 'list') {
        return (
            <Link to={"/community/" + post.id} className="flex items-center gap-2 px-4 py-3 my-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 min-w-0">
                {/* 태블릿, 데스크탑용 badge */}
                <span className="flex-shrink-0 w-[80px] max-sm:hidden"><span className={badge(post.category)[0] + " text-xs font-medium align-text-bottom rounded px-2 py-1"}>{badge(post.category)[1]}</span></span>
                <span className="text-sm font-medium text-gray-900 truncate flex-1">
                    {/* 모바일용 badge */}
                    <span className="inline-block w-2 h-[16px] rounded-full mr-2 align-middle md:hidden" style={{ backgroundColor: badge(post.category)[2] }}></span>
                    {post.title}
                </span>
                { post.likes != 0 &&
                    <span className='text-gray-400 text-xs flex-shrink-0'>👍{post.likes}</span>
                }
                { post.comment != 0 &&
                    <span className='text-gray-400 text-xs flex-shrink-0'>💬{post.comment}</span>
                }
                <span className='text-gray-400 text-xs flex-shrink-0 max-sm:hidden'>{post.author}</span>
                <span className='text-gray-400 text-xs flex-shrink-0 whitespace-nowrap'>{dayjs(post.createdDate).locale('ko').fromNow()}</span>
            </Link>
        );
    }

    return (
        <Link to={"/community/" + post.id} className="block max-w px-4 md:px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <span className={badge(post.category)[0] + " text-xs font-medium rounded mr-2 mb-1 px-2.5 py-1 inline-block"}>{badge(post.category)[1]}</span>
            <h3 className="my-1 text-md font-bold tracking-tight text-gray-900" style={{ textWrap: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                {post.title}
            </h3>
            <div>
                <span className='inline-block text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>📅</span> {dayjs(post.createdDate).locale('ko').fromNow()}</span>
                <span className='inline-block text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>🧑🏻‍💻</span> {post.author}</span>
                <span className='inline-block text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>👀</span> {post.view}</span>
                { post.likes != 0 &&
                    <span className='inline-block text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>👍</span> {post.likes}</span>
                }
                { post.comment != 0 &&
                    <span className='inline-block text-gray-500 text-xs font-medium mr-4'><span className='inline-block mr-1'>💬</span>{post.comment}</span>
                }
            </div>
        </Link>
    );
}

function badge(category) {
    switch(category) {
        case 'NOTICE':
            return ['bg-green-100 text-green-800', '공지사항', 'rgb(220 252 231)'];
        case 'TEAMRECRUITMENT':
            return ['bg-pink-100 text-pink-800', '팀원 모집', 'rgb(252 231 243)'];
        case 'CONTEST':
            return ['bg-yellow-100 text-yellow-800', '대회/공모전', 'rgb(254 249 195)'];
        case 'JOB':
            return ['bg-red-100 text-red-800', '채용/취업', 'rgb(254 226 226)'];
        default:
            return ['bg-purple-100 text-purple-800', '자유게시판', 'rgb(243 232 255)'];
    }
}

export default CommunityListItem;
