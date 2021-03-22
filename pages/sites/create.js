import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import Layout from '../../components/layout'
import LibSite from '../../libs/LibSite'
//
export default class extends Component {
  static async getInitialProps(ctx) {
    var url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
//console.log(json)
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
    }
  }  
  constructor(props){
    super(props)
    this.state = {name: '', content: '', _token : ''}
    this.handleClick = this.handleClick.bind(this);
    this.database = null
//console.log(props)
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
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
        name: this.state.name,
        content: this.state.content,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL + '/api/sites/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        const json = await res.json()
//console.log(json)
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
          <h1>Site - Create</h1>
          <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name"
                    onChange={this.handleChangeTitle.bind(this)} />
                </div>
            </div>
          </div>
          <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
          </div>        
        </form>
        <hr />
        <div className="form-group">
            <button className="btn btn-primary" onClick={this.handleClick}>Create
            </button>
        </div>                
        </div>
      </Layout>
    )    
  } 
}

