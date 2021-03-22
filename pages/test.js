import React from 'react'

import LibCommon from '../libs/LibCommon'
import LibPagenate from '../libs/LibPagenate'
import Layout from '../components/layout'
import TopHeadBox from '../components/TopHeadBox'
import TestChild from '../components/TestChild'
import IndexRow from './IndexRow';
//
//function Page(props) {
export default class extends React.Component {
// console.log(data.blogs)
//  var items = data.blogs.contents
  parentMethod(id){
    console.log("#parentMethod=" + id )
  }
  render(){
    return (
    <Layout>
      <div className="body_main_wrap">
        <div className="container">test:
        <TestChild onHello={(id) => this.parentMethod(id)} />
        <button className="btn btn-outline-primary">
          <i className="fas fa-home"></i> Chat Home
        </button>
        <ul>
        </ul>
        </div>
      </div>
    </Layout>
    )
  }
}
/*
export const getStaticProps = async context => {
  try {
    return {
      props : {
        blogs: [],
      }
    };
  } catch (error) {
    console.error(error);
  }
}
*/

//export default Page
