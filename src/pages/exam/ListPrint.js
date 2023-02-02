import { useState, useEffect, Children} from 'react';
import{
    Link,
  } from "react-router-dom";

import {db} from './fbase'
import { collection, getDocs, updateDoc } from "firebase/firestore";
//firebase로 임시 작업

function ListPrint({prop}){
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    
    const createCount = async (idx) =>{
      await updateDoc(usersCollectionRef, {id: idx});
    }

    useEffect(()=>{
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
      }
  
      getUsers();
    },[])

    const showList = 
    users.map((value, idx) => (<div className="exam-list">
                          <pre>{idx + 1}      <Link to={"/exam/" + idx}> {value.title} </Link></pre> 
                          <pre>이름        작성일  </pre>
                        </div>))
    
    return(
        <div>
            <span>{showList}</span>
        </div>
    );
    //list 형식 > id, 제목, 작성자+날짜
}

export default ListPrint;

{/* <span><pre>{prop.id}        <Link to={"/exam/" + prop.id}>{prop.title}</Link></pre></span>
    <span><pre>{prop.name}     {prop.day}</pre></span> */}