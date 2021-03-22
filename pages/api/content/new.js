var csrf = require('csrf');
var tokens = new csrf();

const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const incrAsync = promisify(client.incr).bind(client);
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
import LibRedis from "../../../libs/LibRedis"
//
export default async function (req, res){
  try{
    var data = req.body
    var token =data._token
    LibRedis.init(client)
    var replyIdx = await incrAsync("idx-content");
//console.log( data )
    var site_id = data.site_id
    var cole_name = data.content_name
    var item = {
      id: replyIdx,
      name: cole_name,
      column_id: data.column_id,
      site_id: site_id,
      values: data.colmuns_json,
      user_id: "",
      created_at: new Date(),
    };    
console.log( item )
    var key = "content:" + site_id +":"+ String(replyIdx)
    var json = JSON.stringify( item );
    await setAsync(key , json)      
    var url = `/content/list?site_id=${item.site_id}&column=${item.column_id}`
//    console.log( "url=",url  )
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
};