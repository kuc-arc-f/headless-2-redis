import Head from 'next/head'
import React from 'react'
import Link from 'next/link';
const redis = require("redis");
const {promisify} = require('util');

import LibRedis from '../../../../libs/LibRedis'
import LibSite from '../../../../libs/LibSite'
//import LibContentType from '../../../../libs/LibContentType'
import LibContent from '../../../../libs/LibContent'
//
export default async function (req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    const client = redis.createClient();
    const delAsync = promisify(client.del).bind(client);
    var content_name = req.query.id
    var apikey = req.headers.apikey
    var data = req.body
    var token =data._token
//console.log( "content_name=", content_name )
    if(typeof data.id =='undefined'){
      throw new Error('Invalid , id');
    }
    var id = data.id
//console.log( "id=", id  )
    var reply_items = await LibRedis.get_keys_items(client, "site:*")
    var key = LibSite.get_site(reply_items, apikey)
    if(key == null){ throw new Error('Invalid key , apikeys') }
    var site_id = key.id 
    var keys = `column:${site_id}:*`
    reply_items = await LibRedis.get_keys_items(client, keys)
    reply_items = LibContent.get_name_items(reply_items, content_name)
//console.log( reply_items ) 
    var column = reply_items[0]
//console.log( column.id ) 
    var column_id = column.id    
    var keyContent = "content:" + site_id +":" + String(column_id) +":" + String(id)
//console.log( "keyContent=", keyContent )
    await delAsync(keyContent)
    client.quit()
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};