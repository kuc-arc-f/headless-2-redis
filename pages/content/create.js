import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import LayoutAdmin from '../../components/LayoutAdmin'
import NaviAdmin from '../../components/NaviAdmin'
import InputRow from '../../components/content/InputRow'
import Footer from '../../components/Footer'

//
export default class extends Component {
  static async getInitialProps(ctx) {
// console.log(ctx.query )
    var id = ctx.query.content_id
    var site_id = ctx.query.site_id
 console.log(site_id)
    var url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
    url = process.env.BASE_URL +'/api/columns/show?id=' + id
    url += "&site_id=" + site_id
    const resContent = await fetch(url)
    const jsonContent = await resContent.json()    
//console.log(jsonContent.item )
    var columns = JSON.parse(jsonContent.item.values || '[]')
//console.log( columns.length )    
    return { 
      user_id :cookies(ctx).user_id,
      site_id :cookies(ctx).site_id,
      csrf: json.csrf,
      content_id: ctx.query.content_id,
      columns: columns,
      content_name: jsonContent.item.name
    }
  }  
  constructor(props){
    super(props)
    this.state = {name: '', content: '', _token : ''}
    this.handleClick = this.handleClick.bind(this);
//console.log(props.content_name )
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
// console.log( "user_id=" ,this.props.user_id )
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
    console.log("#handleClick")
    this.add_item()
  } 
  add_item(){
    try {
      var columns = this.props.columns
      var myForm = document.getElementById('myForm');
      var formData = new FormData(myForm); 
      var elem = []
      columns.map((item, index) => {
//console.log(item.name)
        if(item.name != ""){
          var value = formData.get( item.name )
          var item = {
            name: item.name ,
            value: value,
          }          
//console.log(item )
          elem.push(item)
        }
      })      
      var json= JSON.stringify( elem );
//console.log(json)
      var elemJson = document.getElementById('colmuns_json');
      elemJson.value = json
      document.myForm.submit()
// console.log(item)
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }
  }
  render() {
    var columns = this.props.columns
    var site_id = this.props.site_id
    var  content_name = this.props.content_name
// console.log(site_id)
    return (
    <LayoutAdmin>
      <NaviAdmin  site_name={""} site_id={site_id} />
      <div className="container">
        <form action="/api/content/new" method="post" id="myForm" name="myForm">
          <input type="hidden" id="colmuns_json" name="colmuns_json" />
          <input type="hidden" id="site_id" name="site_id" value={site_id}/> 
          <input type="hidden" id="column_id" name="column_id" value={this.props.content_id}/> 
          <input type="hidden" id="content_name" name="content_name" value={content_name}/> 
          <Link href={`/content/list?site_id=${site_id}`}>
            <a className="btn btn-outline-primary mt-2">Back</a></Link>
          <hr className="mt-2 mb-2" />
          <div className="row">
            <div className="col-sm-6">
              <h3>{content_name} - Add</h3>
            </div>
            <div className="col-sm-6">
              <button className="btn btn-primary" onClick={this.handleClick}>Create
              </button>
            </div>
          </div>
          <hr className="mt-2 mb-2" />
          {columns.map((item, index) => {
//            console.log(item.name)
            if(item.name != ""){
              return (<InputRow key={index} name={item.name} 
                type={item.type}/>
              )
            }
          })}  
        </form>
      </div>
      <Footer />
    </LayoutAdmin>
    )    
  } 
}

