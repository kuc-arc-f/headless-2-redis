const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const keysAsync = promisify(client.keys).bind(client);
const mgetAsync = promisify(client.mget).bind(client);
import LibApiFind from '../../../libs/LibApiFind'
import LibCommon from '../../../libs/LibCommon'

//
export default async function (req, res){
  try{
    var data = await keysAsync("site:*");
    var reply_items = []
    if(data.length > 0){
      reply_items = await mgetAsync(data);
      reply_items = LibCommon.string_to_obj(reply_items)
      reply_items = LibApiFind.get_order_items(reply_items, "id", "DESC")
    }
//console.log(data.length)
//console.log(reply_items)
    var ret ={
      items: reply_items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};