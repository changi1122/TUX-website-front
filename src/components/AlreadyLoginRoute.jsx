import { Navigate } from 'react-router-dom';

function AlreadyLoginRoute({ isLogin, component: Component }) {
    return (
        !isLogin ? Component : <Navigate to='/' {...alert("이미 로그인 된 상태입니다. 해당 페이지를 이용하려면 먼저 로그아웃을 해야 합니다.\n\n메인페이지로 이동합니다.")} />
    )
}

export default AlreadyLoginRoute;