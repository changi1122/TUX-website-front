import { useState, useEffect } from "react";
import{
  Route,
  Link,
} from "react-router-dom";

function PreviousExamination(){
  return (
    <div>
      <h1>JocBo</h1>
      <input placeholder="Search..."/>
      <button>Submit </button>
        <Link to={"/write_page"}>
          Write
        </Link>
    </div>
  );
}

export default PreviousExamination;