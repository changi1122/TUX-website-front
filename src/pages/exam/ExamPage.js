import { useState, useEffect } from 'react';
import {db} from './fbase'
import { collection, getDocs } from "firebase/firestore";
import { useLocation } from 'react-router';

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

    const showContent = (value)=> (<div> 
                                    <h1 style={{margin: 20}}>제목: {value.title}</h1>
                                    <hr/>
                                    <h1 dangerouslySetInnerHTML={{ __html: value.content }} style={{margin: 10}}></h1> 
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