import{
  Link,
} from "react-router-dom";
import ListPrint from "./ListPrint";

function PreviousExamination(){
  return (
    <div>
      <div className="exam-head">
        <span><pre>글번호    제목</pre></span>
        <span><pre>작성자       작성일    </pre></span>
      </div>
      <hr/>
      <div>
        <ListPrint/>
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