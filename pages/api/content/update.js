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
    var item = data
//console.log(data)
    var id = data.id
    var site_id = data.site_id
    var key = "content:" + site_id +":"+ String(id)
    var reply = await getAsync(key);
    var itemOne = await JSON.parse(reply || '[]') 
    itemOne.values = data.colmuns_json
//console.log( "key=",key)
    var json = JSON.stringify( itemOne );
    await setAsync(key , json)
    client.quit()    
    var url = `/content/list?site_id=${itemOne.site_id}&column=${itemOne.column_id}`
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