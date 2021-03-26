var csrf = require('csrf');
var tokens = new csrf();

const redis = require("redis");
const {promisify} = require('util');
import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
    const client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);
    var data = req.body
//console.log(data);
    var item = data
    var id = data.id
    var site_id = data.site_id
    var key = "column:" + site_id +":"+ id
    var reply = await getAsync(key);
    var itemOne = await JSON.parse(reply || '[]') 
    itemOne.values = item.colmuns_json   
//console.log(itemOne);
    var json = JSON.stringify( itemOne );
    await setAsync(key, json)
    var url = `/content_type/${itemOne.site_id}`
//console.log( "url=",url  )       
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};