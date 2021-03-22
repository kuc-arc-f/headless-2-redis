import Link from 'next/link';
import Router from 'next/router'
import cookies from 'next-cookies'
import flash from 'next-flash';
import React from 'react';

import Layout from '../../components/layout'
import IndexRow from './IndexRow';
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
    var id = ctx.query.site_id
    const res = await fetch(process.env.BASE_URL +'/api/sites/setting_get?id=' + id)
    const json = await res.json()
    var item = json.item
//console.log( json.site )
//    if(item == null){
//    }
    return { item: item ,
      site_id: id,
      site: json.site,
    }
  }
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
//console.log(props)
  }
  componentDidMount(){
    if(this.props.item == null){
      alert("Error, webhook URL nothing this site")
      flash.set({ messages_error: 'Error, webhook URL nothing this site' })
      Router.push(`/content/list?site_id=${this.props.site_id}`);
    }
  } 
  async webhook_start(){
    try {
      var item = {}
      var url = this.props.item.webhook_url
console.log(url )
      const res = await fetch(url , {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        console.log("stat=" , res.status )
      } else {
        throw new Error(await res.text());
      }
      alert("complete , webhook start")
console.log("#complete-webhook")
    } catch (error) {
      console.error(error);
    }
  } 
  handleClick(){
    this.webhook_start()
  }
  render(){
    var item = this.props.item
    var site_id = this.props.site_id
    var site = this.props.site
//console.log(this.props.site )
    var webhook_url = ""
    if(item != null){
      webhook_url = item.webhook_url
    }
    return (
    <Layout>
      <div className="container">
        <Link href={`/content/list?site_id=${site_id}`}>
          <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr />
        <h1>Webhook</h1>
        Site : {site.name}<br />
        Site_id : {site._id}
        <hr />
        webhook url : {webhook_url}
        <hr /> 
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>Webhook Start
          </button>
        </div>                              
      </div>
    </Layout>
    )
  }
}  

