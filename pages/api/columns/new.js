var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const incrAsync = promisify(client.incr).bind(client);
const setAsync = promisify(client.set).bind(client);
import LibRedis from "../../../libs/LibRedis"

//
export default async function (req, res){
  try{
    LibRedis.init(client)
    var data = req.body
    var token =data._token
    var site_id = data.site_id
//console.log(data)
console.log("site_id=", site_id)
    LibRedis.init(client)
    var replyIdx = await incrAsync("idx-column");
// console.log( dat.length )
    var item = {
      id: replyIdx,
      name: data.content_name ,  
      values: data.colmuns_json,
      user_id: "",
      site_id: site_id,
      created_at: new Date(),
    };
//console.log(item)
    var key = "column:"+ site_id + ":" + String(replyIdx)
//console.log(key)
    var json = JSON.stringify( item );
    await setAsync(key , json)      
    var url = "/content_type/" + data.site_id
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};