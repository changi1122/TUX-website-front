import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import{
  Link,
} from "react-router-dom";

import {db} from './fbase'
import { collection, getDocs, addDoc} from "firebase/firestore";
//firebase로 임시 작업

//족보 공유를 위한 글쓰기 창인데..
function Writing(){
  const [newTitle, setTitle] = useState("");
  const [newContent, setContent] = useState("");
  const [newId, setId] = useState(0);

  const usersCollectionRef = collection(db, "users");

  const createContent = async () =>{
      await addDoc(usersCollectionRef, {title: newTitle, content: newContent, id: newId});
  }

    return (
      <div className="exam-write">
        <form>
        <input style={{margin: 10}} type='text' placeholder="제목..." size={60} onChange={(event) => {setTitle(event.target.value)}}/>
        <CKEditor 
          editor={ClassicEditor}
          data=""
          onReady={editor => {
          }}

          onChange={(event, editor) => {
            const edata = editor.getData().replace(/<[^>]*>?/g, '');
            {setContent(edata)};
          }}
        />  
        </form>
        <p>
          <button style={{margin: 10}} onClick={createContent}><Link to={"/exam"}>UpLoad</Link></button>
        </p>
      </div>
    );
}

export default Writing;