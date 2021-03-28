var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');

import LibCommon from '../../../libs/LibCommon'
import LibCms from '../../../libs/LibCms'
import LibPagenate from "../../../libs/LibPagenate"
import LibContent from "../../../libs/LibContent"
import LibApiFind from "../../../libs/LibApiFind"
//
export default async function (req, res){
  try{
    const client = redis.createClient();
    const keysAsync = promisify(client.keys).bind(client);
    const mgetAsync = promisify(client.mget).bind(client);    
    var data = req.body
//console.log( data )
    var column_id = data.column_id 
    var site_id = data.site_id 
    var search_key = data.search_key 
    var limit = {skip: 0 , limit: 500 }
    var keys = `content:${site_id}:*`
    var data = await keysAsync(keys);
    var reply_items = []
    if(data.length > 0){
      reply_items = await mgetAsync(data);
      reply_items = LibCommon.string_to_obj(reply_items)
      reply_items = LibCms.get_colmun_items(reply_items, column_id)
      reply_items = LibContent.getSearchItems(reply_items, search_key ,[] )
      reply_items = LibApiFind.get_order_items(reply_items, "id", "DESC")
      LibPagenate.init();
      reply_items = LibPagenate.get_items(
        reply_items, parseInt(limit.skip), parseInt(limit.limit)
      )      
    }    
//console.log( items )    
    var ret ={
      items: reply_items
    }    
//console.log( ret )
    res.json(ret)
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};