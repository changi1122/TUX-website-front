import { useState, useEffect } from 'react';
import {db} from './fbase'
import { collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import { useLocation } from 'react-router';
import{
    Link,
  } from "react-router-dom";
  

function ExamPage(){
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const location = useLocation();
    //location > state > adress 값을 가져오기(ListPrint.js에서 전달)


    useEffect(()=>{
        const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
      }
  
      getUsers();
    },[])


    const deleteContentSub = async(id) =>{
        window.confirm("삭제하시겠습니까?");
        const contentDoc = doc(db, "users", id);
        await deleteDoc(contentDoc);
    }

    // const deleteContent = 
    // users.map((value) => {
    //     if(value.idx == location.state.adress){
    //         deleteContentSub(value.id);
    //     }
    // })

    const showContent = (value)=> (<div> 
                                    <div  style={{display: "flex", justifyContent: "space-between", margin: 20}}>
                                        <p>
                                            <h1 style={{fontSize: 30}}>제목: {value.title}</h1>
                                        </p>
                                        <p>
                                            <Link to={"/exam"}><button onClick={() =>  deleteContentSub(value.id)}>삭제</button></Link>
                                            <h4 style={{fontSize: 10}}>작성일: -{value.timestamp !== null ? value.timestamp && value.timestamp.toDate().getFullYear() : null}.{value.timestamp !== null ? value.timestamp && value.timestamp.toDate().getMonth()+1 : null}.{value.timestamp !== null ? value.timestamp && value.timestamp.toDate().getDate() : null}-</h4>
                                        </p>
                                    </div>
                                    <hr/>
                                    <h1 dangerouslySetInnerHTML={{ __html: value.content }} style={{margin: 20, float:"left"}}></h1> 
                                </div>)
                                //value값을 전달 받아서 출력

    let adressCheck = 0;
    const idCheck = (adress) =>{
        users.map((value) => 
        {if(adress == Number(value.idx)){
            adressCheck = value;
        }
        })
    }
    //adress와 데이터 안 idx 값이 같으면 adressCheck로 value를 전달
    
    return (
      <div>
          {idCheck(location.state.adress)}
          {showContent(adressCheck)}
      </div>
    );
  
}

export default ExamPage;