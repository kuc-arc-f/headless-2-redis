import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

const redis = require("redis");
const {promisify} = require('util');
import LibApiCreate from "../../../../libs/LibApiCreate"
import LibRedis from "../../../../libs/LibRedis"
import LibSite from '../../../../libs/LibSite'
import LibContentType from '../../../../libs/LibContentType'
import LibContent from '../../../../libs/LibContent'
//
export default async function (req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    const client = redis.createClient();
    const incrAsync = promisify(client.incr).bind(client);
    const setAsync = promisify(client.set).bind(client);
    var content_name = req.query.id
    var apikey = req.headers.apikey
    var data = req.body
//console.log( "key=", apikey )
//console.log( "content_name=", content_name )
//console.log( data )
    LibRedis.init(client)
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var site = LibSite.get_site(reply_items, apikey)
    if(site==null){ throw new Error('error, apikey NG'); }
    var site_id = site.id
//console.log( site_id )
    reply_items = await LibRedis.get_keys_items(client, "column:*")
    reply_items= LibContentType.get_site_items(reply_items, site_id)
    reply_items = LibContent.get_name_items(reply_items, content_name) 
    var column = reply_items[0]
//    var column_id = column.id
    var coluValues = JSON.parse(column.values || '[]')
    var newData = LibApiCreate.valid_post(data, coluValues) 
    var newDataJson = JSON.stringify( newData );     
    var replyIdx = await incrAsync("idx-content");
    var key = "content:" + site_id +":"+ String(replyIdx)
    var item = {
      id: replyIdx,
      name: content_name,
      column_id: column.id.toString(),
      site_id: site_id,
      values: newDataJson,
      user_id: "",
      created_at: new Date(),
    };
//console.log( item )
    var json = JSON.stringify( item );
    await setAsync(key , json)
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};