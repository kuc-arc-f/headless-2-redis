const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const keysAsync = promisify(client.keys).bind(client);
const mgetAsync = promisify(client.mget).bind(client);
//import LibRedis from '../../../libs/LibRedis'
import LibCommon from '../../../libs/LibCommon'
import LibContentType from '../../../libs/LibContentType'
//
export default async function (req, res){
  try{
    var site_id = req.query.site_id 
console.log( "site_id=", site_id )
    var data = await keysAsync("column:*");
    var reply_items = []
    if(data.length > 0){
      reply_items = await mgetAsync(data);
    }
    reply_items = LibCommon.string_to_obj(reply_items)
    reply_items= LibContentType.get_site_items(reply_items, site_id)
//console.log(d)    
    var ret ={
      items: reply_items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};