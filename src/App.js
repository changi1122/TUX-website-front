/* eslint-disable*/

import './App.css'
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './pages/Main';
import Page from './pages/Page';

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import PreviousExamination from "./pages/exam/PreviousExamination";
import Writing from "./pages/exam/WritePage";
import ExamPage from './pages/exam/ExamPage';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/page/:pageId" element={<Page />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/exam" element={<PreviousExamination />}></Route>
          <Route path="/write_page" element={<Writing />}></Route>

          {/* 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 됩니다. */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;