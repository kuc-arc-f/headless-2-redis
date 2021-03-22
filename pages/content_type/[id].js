import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import LayoutAdmin from '../../components/LayoutAdmin'
import NaviColumns from '../../components/NaviColumns'
import LibCommon from '../../libs/LibCommon'
import Footer from '../../components/Footer'
import ContentRow from './ContentRow'
//
function Page(data) {
//console.log(data.item._id )
  var site_id= data.item.id
  var item = data.item
  var items = data.contents 
  items = LibCommon.convert_items(items)
//  console.log(items )
  return (
  <LayoutAdmin>
    <NaviColumns  site_name={item.name} site_id={item._id} />
    <div className="container content_type_wrap">
      <Link href="/sites">
        <a className="btn btn-outline-primary mt-2">Back</a></Link>
        <hr className="mt-2 mb-2" />
      <Link href={`/content_type/create?site_id=${site_id}`}>
        <a className="btn btn-primary mt-2">Create ContentType</a>
      </Link>
      <hr className="mt-2 mb-2" />       
      <div><h3>Site : {item.name}</h3>
      </div>
      <div className="row">
        <div className="col-sm-6 p_site_id">Site_id : {item._id}
        </div>
        <div className="col-sm-6">
          <div>{item.content}</div>
        </div>
      </div>
      <table className="table table-hover mt-2">
        <thead>
          <tr><th>Content Name</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {items.map((item, index) => {
  // console.log(item)
          return (<ContentRow key={index} site_id={site_id}
            id={item.id} name={item.name} date={item.created_at} />       
          )
        })}       
        </tbody>
      </table>

    </div>
    <Footer />
  </LayoutAdmin>
  )
}
//
Page.getInitialProps = async (ctx) => {
  console.log(ctx.query.id)
  var id = ctx.query.id
  const res = await fetch(process.env.BASE_URL +'/api/sites/show?id=' + id)
  const json = await res.json()
//console.log( json )
  const resColumn = await fetch(process.env.BASE_URL +'/api/columns/list?site_id='+ id)
  const jsonColumn = await resColumn.json()
// console.log( jsonColumn.items )
  var item = json.item
  return {
    item:item , 
    contents :jsonColumn.items 
//    contents : [] 
  }
}

export default Page

