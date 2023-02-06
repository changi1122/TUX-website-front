import { useState, useEffect} from 'react';
import{
    Link,
  } from "react-router-dom";

import {db} from './fbase'
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import "../../components/table/CommonTable.css"
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
//firebase로 임시 작업

function ListPrint(){
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");


    const idUpdate = async (id, idx) =>{
      const userDoc = doc(db, "users", id);
      const newId = {idx: idx};
      await updateDoc(userDoc, newId);
    }
    //idx 업데이트

    useEffect(()=>{
      const getUsers = async () => {
        const data = await getDocs(query(usersCollectionRef, orderBy("timestamp", "desc")));
        //시간 순서로 정렬
        setUsers(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})));
      }
  
      getUsers();
    },[])

    const showList = 
    users.map((value, idx) => (
                          <CommonTableRow onLoad={idUpdate(value.id, idx + 1)}>
                            <CommonTableColumn>{idx + 1}</CommonTableColumn>      
                            <Link to={`/exam/${idx+1}`} state={{adress: idx+1}}><CommonTableColumn> {value.title} </CommonTableColumn></Link> 
                            <CommonTableColumn>{value.timestamp.toDate().getFullYear()}.{value.timestamp.toDate().getMonth()+1}.{value.timestamp.toDate().getDate()}</CommonTableColumn>  
                            <CommonTableColumn>이름</CommonTableColumn>
                          </CommonTableRow>
                        ))
                        //이동할 Link의 state로 클릭한 항목의 번호를 전달
    
    return(
      <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
            {showList}
      </CommonTable>
    );
    //list 형식 > id, 제목, 작성자+날짜 
}

export default ListPrint;

{/* <span><pre>{prop.id}        <Link to={"/exam/" + prop.id}>{prop.title}</Link></pre></span>
    <span><pre>{prop.name}     {prop.day}</pre></span> */}