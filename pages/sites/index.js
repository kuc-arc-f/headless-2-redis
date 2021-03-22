import Link from 'next/link';
import Router from 'next/router'
import cookies from 'next-cookies'
import flash from 'next-flash';

import LibCommon from '../../libs/LibCommon'
import Layout from '../../components/layout'
import FlashBox from '../../components/FlashBox'

import IndexRow from './IndexRow';
//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch(process.env.BASE_URL+ '/api/sites/list')
    const json = await res.json()
    var items = json.items
//    var items = LibCommon.convert_items(json.items)
//console.log(items)
    return { 
      items: items ,
      user_id :cookies(ctx).user_id,
      flash: flash.get(ctx) || {},
    }
  }
  constructor(props){
    super(props)
//console.log(props.items )
  }
  componentDidMount(){
console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }    
  }  
  render() {
    const items = this.props.items
// console.log(items)
    return (
    <Layout>
      <FlashBox messages_success={this.props.flash.messages_success} />
      { this.props.flash.messages_error ? 
      <div className="alert alert-danger" role="alert">{this.props.flash.messages_error}</div> 
      : <div /> }
      <div className="container">
        <Link href="/sites/create">
          <a className="btn btn-primary mt-2">Create Site</a>
        </Link>  
        <hr className="mt-2 mb-2" />        
        <h3>Site :</h3>
        <table className="table table-hover">
          <tbody>
          {items.map((item, index) => {
            return (<IndexRow key={index} content={item.content}
                  id={item.id} name={item.name} date={item.created_at} />       
            )
          })}
          </tbody>
        </table>
      </div>
    </Layout>
    )
  }
}
