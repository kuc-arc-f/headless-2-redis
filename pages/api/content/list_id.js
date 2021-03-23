const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const keysAsync = promisify(client.keys).bind(client);
//const zrevrangeAsync = promisify(client.zrevrange).bind(client);
const mgetAsync = promisify(client.mget).bind(client);

import LibCommon from '../../../libs/LibCommon'
import LibCms from '../../../libs/LibCms'
import LibPagenate from "../../../libs/LibPagenate"
import LibApiFind from '../../../libs/LibApiFind'
//
export default async function (req, res){
  try{
//console.log(req.query)
    var id = req.query.id
//console.log("id=", id)
    var page = req.query.page
    var data = await keysAsync("content:*");
    var reply_items = []
    if(data.length > 0){
      reply_items = await mgetAsync(data);
      reply_items = LibCommon.string_to_obj(reply_items)
      reply_items = LibCms.get_colmun_items(reply_items, id)
      reply_items = LibApiFind.get_order_items(reply_items, "id", "DESC")
      LibPagenate.init();
      var page_info = LibPagenate.get_page_start(page);
      var limit = {skip: page_info.start , limit: page_info.limit }
      reply_items = LibPagenate.get_items(
        reply_items, parseInt(limit.skip), parseInt(limit.limit)
      )      
//console.log(reply_items)
    }    
    var ret ={
      items: reply_items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};