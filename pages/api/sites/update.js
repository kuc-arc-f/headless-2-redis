var csrf = require('csrf');
var tokens = new csrf();

const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
    var data = req.body
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }  
    var id = data.id
    var reply = await getAsync("site:" + id);
    var item = await JSON.parse(reply || '[]')
    item.name = data.name
    item.content = data.content
//console.log(item);
    var json = JSON.stringify( item );
    await setAsync("site:" + id , json)
//console.log(id);
    var ret ={
      item: {}
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};