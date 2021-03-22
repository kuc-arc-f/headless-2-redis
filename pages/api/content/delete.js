var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const delAsync = promisify(client.del).bind(client);
//import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
    var data = req.body
console.log(data)
    var id = data.id
    var site_id = data.site_id
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    var key = "content:" + site_id +":"+ String(id)
    await delAsync(key)
//console.log(data);
    var ret ={
      id: id
    } 
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};