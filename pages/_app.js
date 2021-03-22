
import React from 'react'
import App from 'next/app'
//import css from "../styles/content.css"
import "../styles/content.css"
import "../styles/content_type.css"

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }
  render () {
    const { Component, pageProps } = this.props
    return (
      <div>
        <Component {...pageProps} />
      </div>
    )
  }
}
