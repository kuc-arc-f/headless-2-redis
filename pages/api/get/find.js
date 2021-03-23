const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
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
//console.log(content_name ,apikey );
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var site = LibSite.get_site(reply_items, apikey)
    if(site==null){ throw new Error('error, apikey NG'); }
    var site_id = site.id
    var keys = `content:${site_id}:*`
//console.log("site_id=", site_id, keys);
    var items = []
    // order
    if(typeof req.query.order !='undefined'){
      var order = req.query.order
      const orderArr = order.split(':');
      if(orderArr.length < 2){ throw new Error('error, orderArr.length'); }
      var order_col = orderArr[0]
      var order_asc = orderArr[1]
      reply_items = await LibRedis.get_keys_items(client, keys )
      reply_items = LibContent.get_name_items(reply_items, content_name)
      reply_items = LibApiFind.convert_items(reply_items) 
      items = LibApiFind.get_order_items(reply_items, order_col, order_asc)
      if(( typeof req.query.skip !='undefined') &&
      ( typeof req.query.limit !='undefined')){
        var skip = req.query.skip
        var limit = req.query.limit
        items = LibPagenate.get_items(items, skip, limit)
      }
    }else{
      var reply_items = []
      reply_items = await LibRedis.get_keys_items(client, keys )
      reply_items = LibContent.get_name_items(reply_items, content_name)
      reply_items = LibApiFind.convert_items(reply_items) 
      items = LibApiFind.get_order_items(reply_items, "id", "DESC")
      if(( typeof req.query.skip !='undefined') &&
        ( typeof req.query.limit !='undefined')){
// console.log("skip=", req.query.skip, req.query.limit );
        items = LibPagenate.get_items(
          items, parseInt(req.query.skip), parseInt(req.query.limit)
        )
      }
    }
//console.log(items.length);  
    res.json(items);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};