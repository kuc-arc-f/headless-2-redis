import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import LibCookie from '../../libs/LibCookie'
import Layout from '../../components/layout'
//
function Page(data) {
//console.log(data.item.id )
  var item = data.item
  var columns = data.columns
// console.log(data.columns )
  return (
  <Layout>
    <div className="container">
      <Link href="/sites">
        <a className="btn btn-outline-primary mt-2">Back</a></Link>
      <hr />
      <Link href="/sites/create">
        <a className="btn btn-primary mt-2">New</a>
      </Link>
      <hr />       
      <div><h1>name : {item.name}</h1>
      </div>
      <div>Content: {item.content}
      </div>
      <hr />
      <h3>Columns</h3> 
      {columns.map((item, index) => {
        console.log(item)
      })}    
    </div>
  </Layout>
  )
}
//
Page.getInitialProps = async (ctx) => {
  console.log(ctx.query.id)
  var id = ctx.query.id
console.log( id )
  const res = await fetch(process.env.BASE_URL +'/api/columns/show?id=' + id)
  const json = await res.json()
  var item = json.item
//console.log( item.values )
  var columns = JSON.parse(item.values || '[]')
//console.log( columns )
  return { item: item ,columns: columns}
}

export default Page

