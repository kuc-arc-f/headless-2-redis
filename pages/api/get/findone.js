const redis = require("redis");
const {promisify} = require('util');
import LibRedis from '../../../libs/LibRedis'
import LibSite from '../../../libs/LibSite'
import LibCommon from '../../../libs/LibCommon'
import LibApiFind from "../../../libs/LibApiFind"
//
export default async function (req, res){
  try{
//console.log(req.query );
    var apikey = req.query.apikey
    if(typeof req.query.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }      
    const client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);
//console.log(apikey );
    var id = req.query.id
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var site = LibSite.get_site(reply_items, apikey)
    if(site==null){ throw new Error('error, apikey NG'); }
    var site_id = site.id
    var key = `content:${site_id}:${id}`
//console.log("key=", key, id) 
    var reply = await getAsync(key); 
    var row = JSON.parse(reply || '[]')
//console.log(row);
//console.log(item);
    var item = LibApiFind.convertItemOne(row)
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
