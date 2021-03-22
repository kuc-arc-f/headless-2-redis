import Link from 'next/link';
import Head from 'next/head';
import flash from 'next-flash';
import React from 'react'
//
export default function Page(props) {
  var user_id = props.user_id
//console.log("user_id:", user_id)
  return (
  <div>
    { user_id ? <Link href="/logout">
      <a><i className="fas fa-sign-out-alt"></i> Logout </a></Link> : 
    <Link href="/login">
      <a><i className="fas fa-sign-in-alt"></i> Login </a>
    </Link> 
    }
  </div>
  );
}
