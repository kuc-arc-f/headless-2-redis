import React from 'react'
import cookies from 'next-cookies'
import flash from 'next-flash';

import Layout from '../components/layout'
import LoginBox from '../components/LoginBox'
import LibConst from '../libs/LibConst'
import FlashBox from '../components/FlashBox'
//
function Home(data) {
// console.log( "user_id=", data.user_id )
    return (
    <Layout>
      <FlashBox messages_success={data.flash.messages_success} />
      <div className="container mb-0">
        <br />
        <LoginBox user_id={data.user_id} />
        <p className="mt-2">version : { data.version }</p>
        <h1>Home</h1>
        <p>welcome , headless-2-Redis</p>
        <br /><br /><br />
      </div>
      <hr className="mb-0"/>
      <br /><br /><br /><br />
    </Layout>
    )
  }
  //
  Home.getInitialProps = async (ctx) => {
//    console.log("uid=", cookies(ctx).user_id, LibConst.get_config().VERSION )
    return { user_id: cookies(ctx).user_id ,
      version: LibConst.get_config().VERSION,
      flash: flash.get(ctx)|| {},
    }
  }
  
  export default Home