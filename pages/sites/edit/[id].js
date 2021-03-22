import Head from 'next/head'
import React from 'react'
import Link from 'next/link';
import cookies from 'next-cookies'
import flash from 'next-flash';
import Router from 'next/router'

import Layout from '../../../components/layout'
import LibSite from '../../../libs/LibSite'
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
//console.log(ctx.query )
    var site_id = ctx.query.id
    var url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    const resSite = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + site_id)
    const jsonSite = await resSite.json()
    var item = jsonSite.item    
//console.log(item)
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
      item: item,
      site_id: site_id,
    }
  }  
  constructor(props){
    super(props)
    this.state = {name: '', content: '', _token : ''}
    this.handleClick = this.handleClick.bind(this);
    this.database = null
console.log(props)
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token,
      name: this.props.item.name ,  content: this.props.item.content,
    });
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  }   
  handleChangeTitle(e){
    this.setState({name: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }   
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      var myForm = document.getElementById('myForm');
      var formData = new FormData(myForm); 
      var valid = LibSite.valid_form(formData)
      if(valid==false){ throw new Error('Invalid , valid_form'); }      
      var item = {
        id : this.props.site_id,
        name: this.state.name,
        content: this.state.content,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL + '/api/sites/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
//console.log(json)
        flash.set({ messages_success: 'Success, Site save' })
        Router.push('/sites');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  } 
  render() {
    return (
      <Layout>
        <div className="container">
        <form method="post" id="myForm" name="myForm">
        <Link href="/sites">
            <a className="btn btn-outline-primary mt-2">Back</a></Link>
          <hr className="mt-2 mb-2" />
          <h1>Site - Edit</h1>
          <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name"
                    value={this.state.name}
                    onChange={this.handleChangeTitle.bind(this)} />
                </div>
            </div>
          </div>
          <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    value={this.state.content}
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
          </div>        
        </form>
        <hr />
        <div className="form-group">
            <button className="btn btn-primary" onClick={this.handleClick}>Save
            </button>
        </div>                
        </div>
      </Layout>
    )    
  } 
}