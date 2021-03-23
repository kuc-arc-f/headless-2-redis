import Head from 'next/head'
import React from 'react'
import Link from 'next/link';
const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const delAsync = promisify(client.del).bind(client);

import LibRedis from '../../../../libs/LibRedis'
import LibSite from '../../../../libs/LibSite'
import LibApiFind from '../../../../libs/LibApiFind'
import LibApiCreate from "../../../../libs/LibApiCreate"
//
export default async function (req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
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
//console.log( "site_id=", site_id )
    var keyContent = "content:" + site_id +":"+ String(id)
//console.log( "keyContent=", keyContent )
    await delAsync(keyContent)
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};