const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
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
    var reply_items = []
    reply_items = await LibRedis.get_keys_items(client, "site:*")
    var site = LibSite.get_site(reply_items, apikey)
    if(site == null){ throw new Error('error, apikey NG'); }
    var site_id = site.id
    var keys = `content:${site_id}:*`
//console.log("site_id=", site_id, keys);
    var items = await LibRedis.get_keys_items(client, keys)
    items= LibContentType.get_site_items(items, site_id)
    items = LibContent.get_name_items(items, content_name)
// console.log(items.length );
    res.json({count : items.length });
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};
