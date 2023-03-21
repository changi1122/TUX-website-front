function Popup({ onOpenAlert, onConfirm, title, message }) {
    const onClickConfirm = () => {
        onOpenAlert();
        onConfirm();
    }

    return (
        <div className={`popup z-50 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center`}>
            <div className="bg-white rounded w-10/12 md:w-1/3">
                <div className="border-b p-4 flex justify-between items-center">
                    <h3 className="font-extrabold text-2xl">{title}</h3>
                </div>
                <div className="text-gray-800 text-lg px-4 py-8 text-justify">
                    {message}
                </div>
                <div className="flex justify-between items-center w-100 border-t p-4 text-gray-500">
                    <button onClick={onOpenAlert} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-black text-lg">
                        취소
                    </button>
                    <button onClick={onClickConfirm} className="bg-gray-800 hover:bg-gray-500 px-4 py-2 rounded text-white text-lg">
                        확인
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Popup;