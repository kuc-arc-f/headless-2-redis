import Link from 'next/link';
import Head from 'next/head';
import React from 'react'
//
// export default function(){
export default class extends React.Component {
  constructor(props){
    super(props)
    props.onHello(44);
    this.count = 1
  }
  clickHandler(id){
    this.count += 1
    this.props.onHello(this.count);
  }
  render(){
    return (
    <div className="main_title_wrap">
      <div id="div_img_layer">
        <h1>Sample Title
        <br />
        </h1>
          <p className="sub_title mt-2">Sample投稿を掲載予定です。
          </p>
          <br />
          <button onClick={this.clickHandler.bind(this, 22)}>parent.exec</button>
      </div>
      <hr />
    </div>
    )
  }
}
