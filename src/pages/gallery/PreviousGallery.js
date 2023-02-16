import{
  Link,
} from "react-router-dom";
import ListPrint from "./ListPrint";
import "../../components/table/CommonTable.css";
import Pagination from "./Pagination";

function PreviousGallery(){
  return (
    <div>
      <p style={{margin: 30, fontSize: 30, float:"left"}}>
        갤러리
      </p>
      
      <ListPrint/>
      <Pagination
        total={100}
        limit={10}
        page={1}
        setPage={1}/>

      <div style={{margin: 10}}>
        <input placeholder="Search..."/>
        <button>검색</button>
          <Link className="right" to={"/write_page_gall"}>
            글쓰기
          </Link>
      </div>
    </div>
  );
}

export default PreviousGallery;