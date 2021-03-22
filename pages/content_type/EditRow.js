import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
//
export default class extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.state = {value: '' ,name:'' , type:''}
//console.log(props )
  }  
//console.log(props.index)
  componentDidMount(){
    this.setState({
      value: this.props.value , name: this.props.name ,
      type: this.props.type,
    });
  }  
  handleChange(event) {
//console.log(event.target.name )
    const value = event.target.value;
    this.setState({name: value });
//    if(event.target.name== "name"){
//    }
  }
  handleChangeType(event){
    console.log(event.target.name )
    const value = event.target.value;
    this.setState({ type: value });
  }
  render(){
    var index = this.props.index
    var nameNo = index + 1
    var col_name = `colmun[${index}]name`
    var col_type = `colmun[${index}]type`
    return (
    <div className="row">
      <div className="col-md-6 form-group">
        <label>Name{nameNo}:</label>
          <input type="text" id={col_name} name={col_name} value={this.state.name}
          className="form-control" onChange={this.handleChange.bind(this)} />
      </div>
      <div className="col-md-6 form-group">
        <label>Type{nameNo}:</label>
        <select id={col_type} name={col_type} value={this.state.type}
        className="form-control" onChange={this.handleChangeType.bind(this)}>
          <option value="0">Select please</option>
          <option value="1">Text</option>
          <option value="2">Text Area</option>
          <option value="3">Number</option>
        </select>              
      </div>
    </div>
    );
  }
}

