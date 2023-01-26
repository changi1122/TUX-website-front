import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//족보 공유를 위한 글쓰기 창인데..
function Writing(){
    return (
      <div className="exam-write">
        <input type='text' placeholder="제목..." size={60}/>
        <CKEditor 
          editor={ClassicEditor}
          data=""
          onReady={editor => {
          }}

          onChange={(event, editor) => {
            const data = editor.getData();
          }}
        />  
        <p>
          <button>업로드!</button>
        </p>
      </div>
    );
}

export default Writing;