import Link from 'next/link';
import Head from 'next/head';
//
export default function Page(props){
//console.log(props)
//  var paginateDisp = 1
  return (
  <div>
    <div className="d1">
      {(props.type=="1")? (
        <div className="form-group">
          <label>{props.name} :</label>
          <input type="text" name={props.name}
            className="form-control" />          
        </div>
      ) : ""
      }
      {(props.type=="2")? (
        <div className="form-group">
          <label>{props.name} :</label>
          <textarea type="text" name={props.name} 
            className="form-control" rows="8"></textarea>
        </div>
      ) : ""
      }
      {(props.type=="3")? (
        <div className="form-group">
          <label>{props.name} :</label>
          <input type="number" name={props.name} 
            className="form-control" ></input>
        </div>
      ) : ""
      }

    </div>    
  </div>
  );
}
