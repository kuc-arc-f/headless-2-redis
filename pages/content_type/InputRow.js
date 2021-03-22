import Link from 'next/link';
import Head from 'next/head';
//
export default function Page(props){
//console.log(props.index)
  var index = props.index
  var nameNo = index + 1
  var col_name = `colmun[${index}]name`
  var col_type = `colmun[${index}]type`
  return (
  <div className="row">
    <div className="col-md-6 form-group">
      <label>Name{nameNo}:</label>
        <input type="text" id={col_name} name={col_name}
        className="form-control" />
    </div>
    <div className="col-md-6 form-group">
      <label>Type{nameNo}:</label>
      <select id={col_type} name={col_type}
      className="form-control">
        <option value="0">Select please</option>
        <option value="1">Text</option>
        <option value="2">Text Area</option>
        <option value="3">Number</option>
      </select>              
    </div>
  </div>
  );
}
