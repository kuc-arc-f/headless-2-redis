import Link from 'next/link';
import Head from 'next/head';
import React from 'react'
//
export default class extends React.Component {
  constructor(props){
    super(props)
  }
  clickHandler(page){
    this.props.parent_func(page);
  }  
  render(){
    var paginateDisp = this.props.paginateDisp
    var nextPage = parseInt(this.props.page) + 1
// console.log("nextPage=" , nextPage)
    return (
      <div>
        { paginateDisp ? (
        <div className="paginate_wrap">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={this.clickHandler.bind(this, 1)}
              className="btn btn-lg btn-outline-primary"> 1st
            </button>
            <button onClick={this.clickHandler.bind(this, nextPage)}
              className="btn btn-lg btn-outline-primary"> >
            </button>
          </div>
        </div>
        ):"" 
        }    
      </div>
      )
  }
}
