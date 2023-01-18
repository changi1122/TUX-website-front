import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

const Main = (props) => {
	return (
		<>
			<h3>메인페이지</h3>
			<div>
				<Link className='line_delete' to="/page/1"><h2>1번 페이지</h2></Link>
				<Link className='line_delete' to="/page/2"><h2>2번 페이지</h2></Link>
			</div>
		</>
	);
};

export default Main;