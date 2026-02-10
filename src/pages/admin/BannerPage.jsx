import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';

function BannerPage() {

    const navigate = useNavigate();
    const [banners, setBanners] = useState(['01.jpg']);

    const [selectedFile, setSelectedFile] = useState(null); // 파일 업로드용

    useEffect(() => {
        getBanners(setBanners);
    }, []);

    async function getBanners(setCallback) {
        const res = await fetch('/api/banner');
        setCallback(await res.json());
    }

    async function removeBanner(filename) {
        if (window.confirm('배너를 삭제하시겠습니까?')) {
            const res = await fetch(`/api/admin/banner/${filename}`, {
                method: "DELETE",
                credentials: 'include'
            });
            if (res.ok) {
                navigate(0);
            } else {
                alert('배너 삭제 중 오류가 발생하였습니다.');
            }
        }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadBanner = async (event) => {
        event.preventDefault();
    
        if (!selectedFile) {
          alert('파일을 선택해주세요.');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        try {
            const res = await fetch(`/api/admin/banner`, {
                method: "POST",
                credentials: 'include',
                body: formData
            });

            if (res.ok) {
                navigate(0);
            } else {
                alert('배너 삭제 중 오류가 발생하였습니다.');
            }
        } catch {
            alert('배너 삭제 중 오류가 발생하였습니다.');
        }
    };


    return (
        <div className='min-h-screen xl:p-20 px-3 py-10'>
            <div>
                <div className='text-5xl font-black'>배너 관리</div>
                <div className="text-lg">CBNU TUX</div>
            </div>

            <div className="mt-20 mx-auto xl:w-[70%] w-full">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-32 mx-auto text-center">
                        <span className="box-border text-xl">배너 목록</span>
                    </div>
                </div>

                <form className="mt-5 overflow-y-scroll">
                    <table className="w-full min-w-[300px] border-separate border-2 text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>파일 이름</th>
                                <th>편집</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                banners && banners.map((filename, index) =>
                                    <tr key={index}>
                                        <td>{filename}</td>
                                        <td className="w-24 py-2">
                                            <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 w-full my-1 inline-block"
                                                onClick={(e) => { e.preventDefault(); removeBanner(filename); }}>
                                                삭제
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </form>

                <form onSubmit={uploadBanner} className="mt-10">
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 my-1 inline-block">배너 이미지 업로드</button>
                </form>

                <p className="mt-20">* 최소 한 개 이상의 배너를 유지하세요. (모든 배너를 삭제하지 마세요.)<br/>오류가 날 수 있습니다.</p>
                <p className="mt-4">* 배너는 파일 이름 순으로 표시됩니다.</p>
            </div>
        </div>
    );
}

export default BannerPage;