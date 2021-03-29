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
    var column_id = data.column_id
    var key = "content:" + site_id +":" + String(column_id) +":" + String(id)
//console.log(key)
    var reply = await getAsync(key);
    var itemOne = await JSON.parse(reply || '[]') 
    var values = JSON.parse(data.colmuns_json || '[]')
    itemOne.values = values
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