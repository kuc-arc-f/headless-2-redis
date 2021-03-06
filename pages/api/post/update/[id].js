const redis = require("redis");
const {promisify} = require('util');

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
    const client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
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
//console.log( column.id ) 
    var column_id = column.id
    var coluValues = JSON.parse(column.values || '[]')
    var newData = LibApiCreate.valid_post(data, coluValues)
    //conten
    var key = "content:" + site_id +":" + String(column_id) +":" + String(id)
//console.log( key )
    var reply = await getAsync(key);
    var content = await JSON.parse(reply || '[]')
    content.values = newData
    var json = JSON.stringify( content );
    await setAsync(key , json)
    client.quit()
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};