import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import{
  Link,
} from "react-router-dom";

import {db} from './fbase'
import { collection, addDoc} from "firebase/firestore";
//firebase로 임시 작업

function WritePage_exam(){
  const [newTitle, setTitle] = useState("");
  const [newContent, setContent] = useState("");
  //title, content를 입력 받을 것

  const usersCollectionRef = collection(db, "jocbo");

  const createContent = async () =>{
      await addDoc(usersCollectionRef, {title: newTitle, content: newContent, idx: 0, timestamp: new Date()});
      //각각 제목, 내용, 글 번호 + 작성일 (시간 순서로 정렬 + 리스트에 보여주기 위함), 
  }

    return (
      <div className="write">
        <form>
        <input style={{margin: 10}} type='text' placeholder="제목..." size={60} onChange={(event) => {setTitle(event.target.value)}}/>
        <CKEditor 
          editor={ClassicEditor}
          data=""
          onReady={editor => {
          }}

          onChange={(event, editor) => {
            const edata = editor.getData();
            {setContent(edata)};
          }}
        />  
        </form>
        <p>
          <button style={{margin: 20}} onClick={createContent}><Link to={"/exam"}>UpLoad</Link></button>
        </p>
      </div>
    );
}

export default WritePage_exam;