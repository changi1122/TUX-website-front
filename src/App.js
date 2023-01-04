/* eslint-disable*/

import './App.css'
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Page from './pages/Page';
import NotFound from './NotFound';

const App = () => {
	return (
		<div className='App'>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/page/:pageId" element={<Page />}></Route>

          {/* 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 됩니다. */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
		</div>
	);
};

export default App;