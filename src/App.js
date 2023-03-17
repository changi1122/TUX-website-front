/* eslint-disable*/

import './App.css'
import React, { Component, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './pages/Main';
import Page from './pages/Page';
import Sitemap from './pages/Sitemap'
import { LoginPage, RegisterPage, SuccessfulSignup, MyPage } from "./pages/auth";
import { Tuxinfo01, Tuxinfo02, Tuxinfo03 } from "./pages/tuxinfo";

import PostView from './pages/post/Postview';

import PreviousExamination from "./pages/exam/PreviousExamination";
import ExamPage from './pages/exam/ExamPage';
import WritePage_exam from './pages/exam/WritePage_exam';

import PreviousGallery from "./pages/gallery/PreviousGallery";
import GalleryPage from "./pages/gallery/GalleryPage";
import WritePage_gall from './pages/gallery/WritePage_gall';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />



        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/page/:pageId" element={<Page />}></Route>
          <Route path="/sitemap" element={<Sitemap />}></Route>
          <Route path="/login" element={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} />}></Route>
          <Route path="/signup" element={<RegisterPage />}></Route>
          <Route path="/signup/successful" element={<SuccessfulSignup />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>

          {/* TUX 개요 */}
          <Route path="/tuxinfo01" element={<Tuxinfo01 />}></Route>
          <Route path="/tuxinfo02" element={<Tuxinfo02 />}></Route>
          <Route path="/tuxinfo03" element={<Tuxinfo03 />}></Route>

          <Route path="/gallery" element={<PreviousGallery />}></Route>
          <Route path="/write_page_gall" element={<WritePage_gall />}></Route>
          <Route path="/gallery/*" element={<GalleryPage />}></Route>

          <Route path="/exam" element={<PreviousExamination />}></Route>
          <Route path="/write_page" element={<WritePage_exam />}></Route>
          <Route path="/exam/*" element={<ExamPage />}></Route>



          <Route path='/postView/:no' component={<PostView />} />

          {/* 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 됩니다. */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>



        <Footer />
      </BrowserRouter>
    </div>
  );
};





export default App;