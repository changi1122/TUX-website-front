/* eslint-disable*/

import './App.css'
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './pages/Main';
import Page from './pages/Page';
import Sitemap from './pages/Sitemap'
<<<<<<< HEAD

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
=======
import { LoginPage, RegisterPage, MyPage } from "./pages/auth";
import { Tuxinfo01, Tuxinfo02, Tuxinfo03 } from "./pages/tuxinfo"
>>>>>>> 1bf73722a24ac707729d57f625b175d1349ba650

import PreviousExamination from "./pages/exam/PreviousExamination";
import ExamPage from './pages/exam/ExamPage';
import WritePage from './pages/exam/WritePage';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/page/:pageId" element={<Page />}></Route>
          <Route path="/sitemap" element={<Sitemap />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
<<<<<<< HEAD
=======
          <Route path="/mypage" element={<MyPage />}></Route>

          {/* TUX 개요 */}
          <Route path="/tuxinfo01" element={<Tuxinfo01 />}></Route>
          <Route path="/tuxinfo02" element={<Tuxinfo02 />}></Route>
          <Route path="/tuxinfo03" element={<Tuxinfo03 />}></Route>

>>>>>>> 1bf73722a24ac707729d57f625b175d1349ba650
          <Route path="/exam" element={<PreviousExamination />}></Route>
          <Route path="/write_page" element={<WritePage />}></Route>
          <Route path="/exam/*" element={<ExamPage />}></Route>

          {/* 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 됩니다. */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;