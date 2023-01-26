import { useState, useEffect } from "react";
import{
  Route,
  Link,
} from "react-router-dom";
import ListPrint from "./ListPrint";

function PreviousExamination(){
  const list = [
    {id: 1, title: "컴퓨터시스템개론(조희승)", name: "zino", day: "2023.01.25"},
    {id: 2, title: "응용컴퓨터프로그래밍(이의종)", name: "jino", day: "2023.01.25"},
    {id: 3, title: "오픈소스이해와실습(신재혁)", name: "hino", day: "2023.01.25"},
    {id: 4, title: "이산수학(이병훈)", name: "pino", day: "2023.01.25"},
    {id: 5, title: "오픈소스이해와실습(노서영)", name: "kino", day: "2023.01.25"},
  ]

  return (
    <div>
      <h1>족보</h1>
      <div>
        <ListPrint props={list}/>
      </div>
      
      <input placeholder="Search..."/>
      <button>검색</button>
        <Link className="exam-right" to={"/write_page"} >
          글쓰기
        </Link>
    </div>
  );
}

export default PreviousExamination;