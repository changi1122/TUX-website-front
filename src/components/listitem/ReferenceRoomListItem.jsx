import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

function ReferenceRoomListItem({ post, viewMode='list' }) {
    if (viewMode === 'list') {
        return (
            <Link to={"/referenceroom/" + post.id} className="flex items-center gap-2 px-4 py-3 my-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 min-w-0">
                <span className="flex-shrink-0 w-[80px]"><span className={badge(post.category)[0] + " text-xs font-medium align-text-bottom rounded px-2 py-1"}>{badge(post.category)[1]}</span></span>
                { post.lecture &&
                    <span className="flex-shrink-0"><span className="text-gray-600 text-xs align-text-bottom bg-gray-100 rounded px-1.5 py-1 whitespace-nowrap flex-shrink-0 max-sm:hidden">{post.lecture}</span></span>
                }
                <span className="text-sm font-medium text-gray-900 truncate flex-1">{post.title}</span>
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
        <Link to={"/referenceroom/" + post.id} className="block max-w px-4 md:px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <span className={badge(post.category)[0] + " text-xs font-medium rounded mr-2 mb-2 px-2.5 py-1 inline-block align-text-top"}>{badge(post.category)[1]}</span>
            {
                post.lecture &&
                <span className="inline-block max-w-[160px] overflow-hidden text-ellipsis align-text-top mb-2
                                bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded whitespace-nowrap">
                    {post.lecture}
                </span>
            }
            {
                post.semester &&
                <span className="inline-block max-w-[160px] overflow-hidden text-ellipsis align-text-top mb-2
                                bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded whitespace-nowrap">
                    {post.semester}
                </span>
            }
            {
                post.professor &&
                <span className="inline-block max-w-[160px] overflow-hidden text-ellipsis align-text-top mb-2
                                bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded whitespace-nowrap">
                    {post.professor}
                </span>
            }
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
        case 'STUDY':
            return ['bg-red-100 text-red-800', '강의/스터디'];
        case 'GALLERY':
            return ['bg-yellow-100 text-yellow-800', '갤러리'];
        default:
            return ['bg-purple-100 text-purple-800', '시험정보'];
    }
}

export default ReferenceRoomListItem;
