import{
  Link,
} from "react-router-dom";
import ListPrint from "./ListPrint";
import "../../components/table/CommonTable.css"

function PreviousExamination(){
  return (
    <div>
      <ListPrint/>
      <div>
        <input placeholder="Search..."/>
        <button>검색</button>
          <Link className="exam-right" to={"/write_page"} >
            글쓰기
          </Link>
      </div>
    </div>
  );
}

export default PreviousExamination;