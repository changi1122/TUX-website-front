import { useState, useEffect} from 'react';
import{
    Link,
  } from "react-router-dom";


import {db} from './fbase'
import { collection, getDocs, updateDoc, doc, query, orderBy} from "firebase/firestore";
import "../../components/table/CommonTable.css"
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import Pagination from "react-js-pagination";
import "../../components/pagination.css"
//firebase로 임시 작업

function ListPrint(){
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "jocbo");
    const [items, setItems] = useState(10);

    const idUpdate = async (id, idx) =>{
      const userDoc = doc(db, "jocbo", id);
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

    const [page, setPage] = useState(1);
    const handlePageChange = page => {
        setPage(page);
    };
    const itemChange = (e) => {
      setItems(Number(e.target.value))
  
    }

    const showList = 
    users.slice(
      items*(page-1),
      items*(page-1)+items
    ).map((value, idx) => (
                          <CommonTableRow onLoad={idUpdate(value.id, ((page - 1)* 5) + idx + 1)}>
                            <CommonTableColumn>{((page - 1) * 5) + idx + 1}</CommonTableColumn>      
                            <Link to={`/exam/${idx+1}`} state={{adress: idx+1}}><CommonTableColumn> {value.title} </CommonTableColumn></Link> 
                            <CommonTableColumn>{value.timestamp.toDate().getFullYear()}.{value.timestamp.toDate().getMonth()+1}.{value.timestamp.toDate().getDate()}</CommonTableColumn>  
                            <CommonTableColumn>이름</CommonTableColumn>
                          </CommonTableRow>
                        ))
                        //이동할 Link의 state로 클릭한 항목의 번호를 전달
    
    return(
      <div>
        <CommonTable headersName={['글번호', '제목', '등록일', '작성자']} onChange={itemChange}>
              {showList}
        </CommonTable>
        
          <Pagination 
            activePage={page}
            itemsCountPerPage={items}
            totalItemsCount={users.length}
            prevPageText="이전"
            nextPageText="다음"
            onChange={handlePageChange}>
          </Pagination>
      </div>
    );
    //list 형식 > id, 제목, 작성자+날짜 
}


export default ListPrint;