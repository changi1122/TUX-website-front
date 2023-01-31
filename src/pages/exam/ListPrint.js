import{
    Link,
  } from "react-router-dom";

function List({prop}){
    return(
        <div className="exam-list">
            <span><pre>{prop.id}        <Link to={"/exam/" + prop.id}>{prop.title}</Link></pre></span>
            <span><pre>{prop.name}     {prop.day}</pre></span>
        </div>
    );
    //list 형식 > id, 제목, 작성자+날짜
}

function ListPrint({props}){
    return(
        <div>
            {
            props.map((prop) =>
                <List prop={prop}/> 
                )
            }
        </div>
    );
}

export default ListPrint;