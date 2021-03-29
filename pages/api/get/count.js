const redis = require("redis");
const {promisify} = require('util');

import LibRedis from '../../../libs/LibRedis'
import LibSite from '../../../libs/LibSite'
//import LibCommon from '../../../libs/LibCommon'
//import LibApiFind from "../../../libs/LibApiFind"
import LibContentType from '../../../libs/LibContentType'
import LibContent from '../../../libs/LibContent'
//
export default async function (req, res){
  try{
//console.log(req.query );
    var content_name = req.query.content
    if(typeof req.query.apikey == 'undefined'){ throw new Error('error, apikey NG'); }
    var apikey = req.query.apikey
    const client = redis.createClient();
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var site = LibSite.get_site(reply_items, apikey)
    if(site == null){ throw new Error('error, apikey NG'); }
    var site_id = site.id
    var keys = `column:${site_id}:*`
    reply_items = await LibRedis.get_keys_items(client, keys)
    reply_items = LibContent.get_name_items(reply_items, content_name)    
    if(reply_items.length < 1){ throw new Error('error, column nothing'); }
    var column = reply_items[0]
    var column_id = column.id     
    var keys = `content:${site_id}:${column_id}:*`
//console.log("site_id=", site_id, keys);
    const keysAsync = promisify(client.keys).bind(client);
    var data = await keysAsync(keys);
// console.log(data);
//console.log(data.length );
    client.quit()
    res.json({count : data.length });
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
