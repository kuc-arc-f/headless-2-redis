const redis = require("redis");
const {promisify} = require('util');
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
    if(typeof req.query.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }    
    const client = redis.createClient();
//console.log(content_name ,apikey );
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var site = LibSite.get_site(reply_items, apikey)
    if(site==null){ throw new Error('error, apikey NG'); }
    var site_id = site.id
    var keys = `column:${site_id}:*`
    reply_items = await LibRedis.get_keys_items(client, keys)
    reply_items = LibContent.get_name_items(reply_items, content_name)    
    if(reply_items.length < 1){ throw new Error('error, column nothing'); }
    var column = reply_items[0]
//console.log( column.id ) 
    var column_id = column.id 
    keys = `content:${site_id}:${column_id}:*`
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
//console.log(reply_items)
      items = LibApiFind.get_order_items(reply_items, "id", "DESC")
      if(( typeof req.query.skip !='undefined') &&
        ( typeof req.query.limit !='undefined')){
// console.log("skip=", req.query.skip, req.query.limit );
        items = LibPagenate.get_items(
          items, parseInt(req.query.skip), parseInt(req.query.limit)
        )
      }else{
        items = LibPagenate.get_items( items, 0, 10 )        
      }
      items = LibApiFind.convert_items(items) 
    }
//console.log(items);  
    client.quit()
    res.json(items);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};