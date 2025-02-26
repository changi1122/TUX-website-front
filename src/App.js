/* eslint-disable*/

import './components/markdown.scss';
import './components/Pagination.scss';
import './components/quill.snow.css';
import './App.css';

import React, { lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Header, Footer, PrivateRoute } from './components';
import Loading from './Loading';
import NotFound from './NotFound';
import NoPermission from './NoPermission';

/* Lazy loading for code splitting */
const Main = lazy(() => import('./pages/Main'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const SuccessfulSignup = lazy(() => import('./pages/auth/SuccessfulSignup'));
const MyPage = lazy(() => import('./pages/auth/MyPage'));
const AdministratorPage = lazy(() => import('./pages/admin/AdministratorPage'));
const StaticPage = lazy(() => import('./pages/admin/StaticPage'));

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
const GalleryDetail = lazy(() => import('./pages/gallery/GalleryDetail'));
const GalleryWrite = lazy(() => import('./pages/gallery/GalleryWrite'));
const GalleryEdit = lazy(() => import('./pages/gallery/GalleryEdit'));

const JoinPage = lazy(() => import('./pages/join/JoinPage'));
const ContactPage = lazy(() => import('./pages/join/ContactPage'));

const Sitemap = lazy(() => import('./pages/Sitemap'));

/* Dayjs */
import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
dayjs().locale('ko');

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (localStorage.role)
      setRole(localStorage.role);
    if (sessionStorage.role)
      setRole(sessionStorage.role);

    if (role === 'ADMIN') {
      setIsAdmin(true);
    }
    else {
      setIsAdmin(false);
    }
  }, [isLogin]);

  function isLogined() {
    return (localStorage.cbnu_tux_userid || sessionStorage.cbnu_tux_userid);
  }

  function isNotGuest() {
    if (localStorage.role)
      return localStorage.role !== "GUEST";
    if (sessionStorage.role)
      return sessionStorage.role !== "GUEST";
    return false;
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Header isLogin={isLogin} isAdmin={isAdmin} setIsLogin={setIsLogin} />

        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/admin' element={
              <PrivateRoute isThatTrue={isAdmin} isTrue={<AdministratorPage />} isFalse={<NoPermission />} />
            } />
            <Route path='/admin/staticpage' element={
              <PrivateRoute isThatTrue={isAdmin} isTrue={<StaticPage />} isFalse={<NoPermission />} />
            } />
            <Route path="/sitemap" element={<Sitemap isLogin={isLogin} />}></Route>


            {/* auth pages */}
            <Route path="/login" element={
              // 이미 로그인 되어 있는 상태라면, 권한 없음 페이지 표시(GUEST 권한으로 자료실/갤러리 접근하는 경우)
              <PrivateRoute isThatTrue={isLogined()} isTrue={<NoPermission />} isFalse={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} />} />
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
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoom />} isFalse={<Navigate to='/login' />} />
            } />
            <Route path="/referenceroom/:id" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoomDetail />} isFalse={<Navigate to='/login' />} />
            } />
            <Route path="/referenceroom/write" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoomWrite />} isFalse={<Navigate to='/login' />} />
            } />
            <Route path="/referenceroom/:id/edit" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoomEdit />} isFalse={<Navigate to='/login' />} />
            } />

            {/* 갤러리 */}
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/gallery/:id" element={<GalleryDetail />}></Route>
            <Route path="/gallery/write" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<GalleryWrite />} isFalse={<Navigate to='/login' />} />
            } />
            <Route path="/gallery/:id/edit" element={
              <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<GalleryEdit />} isFalse={<Navigate to='/login' />} />
            } />

            {/* 지원하기 */}
            <Route path="/join" element={<JoinPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>

            {/* 사용안함: <Route path='/postView/:no' component={<PostView />} />*/}

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