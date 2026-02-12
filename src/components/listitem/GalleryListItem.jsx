import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

function GalleryListItem({ post, viewMode='gallery' }) {
    if (viewMode === 'list') {
        return (
            <Link to={"/gallery/" + post.id} className="flex items-center gap-2 px-4 py-3 my-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 min-w-0">
                <span className="flex-shrink-0 w-[80px]"><span className="bg-yellow-100 text-yellow-800 text-xs font-medium rounded px-2 py-1">갤러리</span></span>
                <span className="text-sm font-medium text-gray-900 truncate flex-1">{post.title}</span>
                { post.comment != 0 &&
                    <span className='text-gray-400 text-xs flex-shrink-0'>💬{post.comment}</span>
                }
                <span className='text-gray-400 text-xs flex-shrink-0 max-sm:hidden'>{post.author}</span>
                <span className='text-gray-400 text-xs flex-shrink-0 whitespace-nowrap'>{dayjs(post.createdDate).locale('ko').fromNow()}</span>
            </Link>
        );
    }

    if (viewMode === 'detail') {
        return (
            <Link to={"/gallery/" + post.id} className="block max-w px-6 py-3 my-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium rounded mr-2 mb-1 px-2.5 py-1 inline-block">갤러리</span>
                {
                    post.lecture &&
                    <span className="inline-block max-w-[160px] overflow-hidden text-ellipsis align-text-top mb-1
                                    bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-1 rounded whitespace-nowrap">
                        {post.lecture}
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

    // gallery (default)
    return (
        <Link to={"/gallery/" + post.id} className="block bg-white border border-gray-200 rounded-lg overflow-hidden">
            <img className="h-[200px] w-full object-cover" src={(post.mainImage) ? post.mainImage.path : '/images/noimage.jpg'} alt=""/>
            <div className="px-3 pt-2 pb-3">
                <div className="flex items-center gap-3 text-gray-500 text-xs mt-1 mb-1.5">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comment}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                <span className="text-xs text-gray-400">{dayjs(post.createdDate).locale('ko').fromNow()}</span>
            </div>
        </Link>
    );
}

export default GalleryListItem;
