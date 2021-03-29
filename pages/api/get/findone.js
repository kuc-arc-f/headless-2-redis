const redis = require("redis");
const {promisify} = require('util');
import LibRedis from '../../../libs/LibRedis'
import LibSite from '../../../libs/LibSite'
import LibCommon from '../../../libs/LibCommon'
import LibApiFind from "../../../libs/LibApiFind"
import LibContent from '../../../libs/LibContent'
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
    var content_name = req.query.content
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
    var key = `content:${site_id}:${column_id}:${id}`
//console.log("key=", key, id) 
    var reply = await getAsync(key); 
    var row = JSON.parse(reply || '[]')
//console.log(row);
    var item = LibApiFind.convertItemOne(row)
    client.quit()
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
