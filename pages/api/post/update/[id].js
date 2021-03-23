const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

import LibRedis from '../../../../libs/LibRedis'
import LibSite from '../../../../libs/LibSite'
import LibContentType from '../../../../libs/LibContentType'
import LibContent from '../../../../libs/LibContent'
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
//console.log( "key=", apikey )
//console.log( "content_name=", content_name )
//console.log( data )
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var key = LibSite.get_site(reply_items, apikey)
//console.log( key )
    if(key == null){ throw new Error('Invalid key , apikeys') }
    var site_id = key.id
//console.log( site_id )
    if(typeof data.id =='undefined'){
      throw new Error('Invalid , id');
    }
    var id = data.id
//console.log( "id=", id  )  
    reply_items = await LibRedis.get_keys_items(client, "column:*")
    reply_items= LibContentType.get_site_items(reply_items, site_id)
//console.log( reply_items ) 
    reply_items = LibContent.get_name_items(reply_items, content_name)
    var column = reply_items[0]
    var coluValues = JSON.parse(column.values || '[]')
    var newData = LibApiCreate.valid_post(data, coluValues)
    var newDataJson = JSON.stringify( newData );     
    //conten
    var key = "content:" + site_id +":"+ String(id)
    var reply = await getAsync(key);
    var content = await JSON.parse(reply || '[]')
    content.values = newDataJson
//console.log( content )
    var json = JSON.stringify( content );
    await setAsync(key , json)
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};