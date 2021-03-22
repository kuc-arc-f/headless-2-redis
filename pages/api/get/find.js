const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
//const getAsync = promisify(client.get).bind(client);
//const mgetAsync = promisify(client.mget).bind(client);
import LibRedis from '../../../libs/LibRedis'
import LibCommon from '../../../libs/LibCommon'
import LibSite from '../../../libs/LibSite'
import LibApiFind from "../../../libs/LibApiFind"
import LibPagenate from "../../../libs/LibPagenate"
import LibContentType from '../../../libs/LibContentType'
import LibContent from '../../../libs/LibContent'
//
export default async function (req, res){
  try{
//console.log(req.query );
    var content_name = req.query.content
    var apikey = req.query.apikey
console.log(content_name ,apikey );
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var site = LibSite.get_site(reply_items, apikey)
    if(site==null){ throw new Error('error, apikey NG'); }
    var site_id = site.id
//    var keys = `content:${id}:*`
//console.log("keys=", keys)              
    var items = []
    // order
    if(typeof req.query.order !='undefined'){
      var order = req.query.order
      const orderArr = order.split(':');
      if(orderArr.length < 2){ throw new Error('error, orderArr.length'); }
      var order_col = orderArr[0]
      var order_asc = orderArr[1]
      reply_items = await LibRedis.get_keys_items(client, "content:*")
      reply_items= LibContentType.get_site_items(reply_items, site_id)
      reply_items = LibContent.get_name_items(reply_items, content_name)
      reply_items = LibApiFind.convert_items(reply_items) 
      /*
      items = await collection.find(where).toArray() 
      items = LibApiFind.get_order_items(items, order_col, order_asc)
      */
      if(( typeof req.query.skip !='undefined') &&
      ( typeof req.query.limit !='undefined')){
        var skip = req.query.skip
        var limit = req.query.limit
        items = LibPagenate.get_items(items, skip, limit)
      }
    }else{
      var reply_items = []
      reply_items = await LibRedis.get_keys_items(client, "content:*")
      reply_items= LibContentType.get_site_items(reply_items, site_id)
      reply_items = LibContent.get_name_items(reply_items, content_name)
      if(( typeof req.query.skip !='undefined') &&
        ( typeof req.query.limit !='undefined')){
console.log("skip=", req.query.skip, req.query.limit );
        reply_items = LibPagenate.get_items(
          reply_items, parseInt(req.query.skip), parseInt(req.query.limit)
        )
//console.log(items)        
      }
      items = LibApiFind.convert_items(reply_items) 
//console.log(items)        
    }
//console.log(items.length);  
    res.json(items);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};