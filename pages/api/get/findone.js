const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
import LibRedis from '../../../libs/LibRedis'
import LibSite from '../../../libs/LibSite'
import LibCommon from '../../../libs/LibCommon'
import LibApiFind from "../../../libs/LibApiFind"
//
export default async function (req, res){
  try{
//console.log(req.query );
    var apikey = req.query.apikey
//console.log(apikey );
    var id = req.query.id
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var site = LibSite.get_site(reply_items, apikey)
    if(site==null){ throw new Error('error, apikey NG'); }
//console.log(site)  
    var items = await LibRedis.get_keys_items(client, "content:*")
    var item = LibRedis.get_item(items, id) 
    item = LibApiFind.convertItemOne(item)
//console.log(item);
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
