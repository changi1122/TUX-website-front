export default function AttachmentItem({ file, onDelete, editorVersion }) {
    const displayName = file.displayName || file.filename;
    const hasActions = !!onDelete;

    return (
        <>
            <div className={`flex items-center max-w px-4 md:px-6 py-3 ${hasActions ? 'mt-3 mb-2' : 'my-3'} bg-white border border-gray-200 rounded-lg shadow`}>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
                    {file.isImage ? '이미지' : '첨부파일'}
                </span>
                <a className='flex-1 text-sm hover:underline break-all' href={file.path + "?aid=" + file.id} target='_blank' rel="noreferrer">
                    {displayName}
                </a>
                <span className='ml-2 text-sm text-gray-500'>
                    <svg className="inline w-[14px] h-[14px] text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                        <path stroke='#727272' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
                    </svg>
                    <span className='ml-1'>{file.downloadCount + "회"}</span>
                </span>
            </div>
            {hasActions && (
                <div className='flex justify-end mb-4'>
                    {file.isImage && (
                        <>
                            {editorVersion === 1 && (
                                <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                    onClick={() => Window.insertImage(file.path)}>
                                    이미지 본문 삽입
                                </button>
                            )}
                            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                                onClick={() => window.navigator.clipboard.writeText(file.path)}>
                                링크 복사
                            </button>
                        </>
                    )}
                    <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 ml-2 inline-block"
                        onClick={() => onDelete(file.filename)}>
                        삭제
                    </button>
                </div>
            )}
        </>
    );
}
