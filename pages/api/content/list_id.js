const redis = require("redis");
const {promisify} = require('util');

import LibCommon from '../../../libs/LibCommon'
import LibCms from '../../../libs/LibCms'
import LibPagenate from "../../../libs/LibPagenate"
import LibApiFind from '../../../libs/LibApiFind'
//
export default async function (req, res){
  try{
//console.log(req.query)
    const client = redis.createClient();
    const keysAsync = promisify(client.keys).bind(client);
    const mgetAsync = promisify(client.mget).bind(client);
    var id = req.query.id
    var site_id = req.query.site_id
//console.log("id=", id, site_id)
    var page = req.query.page
    var keys = `content:${site_id}:*`
    var data = await keysAsync(keys);
    var reply_items = []
    var all_items = []
    if(data.length > 0){
      reply_items = await mgetAsync(data);
      reply_items = LibCommon.string_to_obj(reply_items)
      reply_items = LibCms.get_colmun_items(reply_items, id)
      all_items = reply_items
      reply_items = LibApiFind.get_order_items(reply_items, "id", "DESC")
      LibPagenate.init();
      var page_info = LibPagenate.get_page_start(page);
      var limit = {skip: page_info.start , limit: page_info.limit }
      reply_items = LibPagenate.get_items(
        reply_items, parseInt(limit.skip), parseInt(limit.limit)
      )      
//console.log(all_items.length )
    }    
    var ret ={
      items: reply_items , count: all_items.length,
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};