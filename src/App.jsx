/* eslint-disable*/

import './components/pagination/Pagination.scss';
import './components/markdown/markdown.scss';
import './components/editor/quill.snow.css';
import './App.css';
import './style.css';

import React, { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { actions } from './modules/UserModule';

/* Dayjs */
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs().locale('ko');

import { Header, Footer, PrivateRoute } from './components';
import Loading from './pages/common/Loading';
import NotFound from './pages/common/NotFound';
import NoPermission from './pages/common/NoPermission';

/* Lazy loading for code splitting */
const Main = lazy(() => import('./pages/Main'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const SuccessfulSignup = lazy(() => import('./pages/auth/SuccessfulSignup'));
const MyPage = lazy(() => import('./pages/auth/MyPage'));
const AdministratorPage = lazy(() => import('./pages/admin/AdministratorPage'));
const StaticPage = lazy(() => import('./pages/admin/StaticPage'));
const BannerPage = lazy(() => import('./pages/admin/BannerPage'));

const Tuxinfo01 = lazy(() => import('./pages/tuxinfo/Tuxinfo01'));
const Tuxinfo02 = lazy(() => import('./pages/tuxinfo/Tuxinfo02'));
const Tuxinfo03 = lazy(() => import('./pages/tuxinfo/Tuxinfo03'));

const Community = lazy(() => import('./pages/community/Community'));
const CommunityDetail = lazy(() => import('./pages/community/CommunityDetail'));
const CommunityWrite = lazy(() => import('./pages/community/CommunityWrite'));
const CommunityEdit = lazy(() => import('./pages/community/CommunityEdit'));

const ReferenceRoom = lazy(() => import('./pages/referenceroom/ReferenceRoom'));
const ReferenceRoomDetail = lazy(() => import('./pages/referenceroom/ReferenceRoomDetail'));
const ReferenceRoomWrite = lazy(() => import('./pages/referenceroom/ReferenceRoomWrite'));
const ReferenceRoomEdit = lazy(() => import('./pages/referenceroom/ReferenceRoomEdit'));
const Gallery = lazy(() => import('./pages/gallery/Gallery'));

const JoinPage = lazy(() => import('./pages/join/JoinPage'));
const ContactPage = lazy(() => import('./pages/join/ContactPage'));

const Sitemap = lazy(() => import('./pages/common/Sitemap'));

const App = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector(state => state.userReducer);

  useEffect(() => {
    // storage에 저장된 로그인 정보가 있다면, 로그인 상태로 설정
    if (localStorage.userId || sessionStorage.userId) {
      const storage = localStorage.userId ? localStorage : sessionStorage;

      const token = storage.getItem('token');
      const expiresIn = storage.getItem('expiresIn');
      const userId = storage.getItem('userId');
      const username = storage.getItem('username');
      const nickname = storage.getItem('nickname');
      const role = storage.getItem('role');

      const isExpired = !expiresIn || Date.now() > Number(expiresIn);

      if (!isExpired && token && userId && username) {
        dispatch(actions.user.setUser({
            token,
            expiresIn,
            userId,
            username,
            nickname,
            role
        }));
      } else {
        // 만료되었으면 양쪽 스토리지 모두 정리
        localStorage.clear();
        sessionStorage.clear();
        dispatch(actions.user.initGuest());
      }
    }
    else {
      // 로그인 상태가 아니라면
      dispatch(actions.user.initGuest());
    }
  }, []);

  
  function isLogined() { return loginUser.isLoggedIn; }
  function isAdmin() { return loginUser.role === "ADMIN"; }
  function isNotGuest() { return loginUser.role !== "GUEST"; }

  // loginUser.isInitialized가 false인 경우, 초기화 중이므로 로딩 화면을 표시
  if (!loginUser.isInitialized) {
    return (
      <div className='App'>
        <BrowserRouter>
          <Header />
          <Loading />
          <Footer />
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />

        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/admin' element={
              <PrivateRoute isThatTrue={isAdmin()} isTrue={<AdministratorPage />} isFalse={<NoPermission />} />
            } />
            <Route path='/admin/staticpage' element={
              <PrivateRoute isThatTrue={isAdmin()} isTrue={<StaticPage />} isFalse={<NoPermission />} />
            } />
            <Route path='/admin/bannerpage' element={
              <PrivateRoute isThatTrue={isAdmin()} isTrue={<BannerPage />} isFalse={<NoPermission />} />
            } />
            <Route path="/sitemap" element={<Sitemap />}></Route>


            {/* auth pages */}
            <Route path="/login" element={
              // 이미 로그인 되어 있는 상태라면, 권한 없음 페이지 표시(GUEST 권한으로 자료실 접근하는 경우)
              <PrivateRoute isThatTrue={isLogined()} isTrue={<NoPermission />} isFalse={<LoginPage />} />
            } />
            <Route path="/signup" element={
              <PrivateRoute isThatTrue={isLogined()} isTrue={<NotFound />} isFalse={<RegisterPage />} />
            } />
            <Route path="/signup/successful" element={
              <PrivateRoute isThatTrue={isLogined()} isTrue={<NotFound />} isFalse={<SuccessfulSignup />} />
            } />
            <Route path="/mypage" element={
              // 로그인 하지 않은 사용자는, mypage에 접근할 수 없음
              <PrivateRoute isThatTrue={isLogined()} isTrue={<MyPage />} isFalse={<NotFound />} />
            } />


            {/* TUX 개요 */}
            <Route path="/tuxinfo01" element={<Tuxinfo01 />}></Route>
            <Route path="/tuxinfo02" element={<Tuxinfo02 />}></Route>
            <Route path="/tuxinfo03" element={<Tuxinfo03 />}></Route>


            {/* 커뮤니티 */}
            <Route path="/community" element={<Community />}></Route>
            <Route path="/community/:id" element={<CommunityDetail />}></Route>
            <Route path="/community/write" element={<CommunityWrite />}></Route>
            <Route path="/community/:id/edit" element={<CommunityEdit />}></Route>


            {/* 자료실 */}
            <Route path="/referenceroom" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoom />} isFalse={<Navigate to={`/login?from=%2Freferenceroom`} />} />
            } />
            <Route path="/referenceroom/:id" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoomDetail />} isFalse={<Navigate to='/login?from=%2Freferenceroom' />} />
            } />
            <Route path="/referenceroom/write" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoomWrite />} isFalse={<Navigate to='/login?from=%2Freferenceroom' />} />
            } />
            <Route path="/referenceroom/:id/edit" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoomEdit />} isFalse={<Navigate to='/login?from=%2Freferenceroom' />} />
            } />

            {/* 갤러리 */}
            <Route path="/gallery" element={<Gallery />}></Route>

            {/* 지원하기 */}
            <Route path="/join" element={<JoinPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>

            {/* 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 됩니다. */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>

          <Footer />
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
};


export default App;