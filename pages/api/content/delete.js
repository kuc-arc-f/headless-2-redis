var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
//import LibRedis from '../../../libs/LibRedis'
//
export default async function (req, res){
  try{
    var data = req.body
//console.log(data)
    var id = data.id
    var site_id = data.site_id
    var column_id = data.column_id
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    } 
    const client = redis.createClient();
    const delAsync = promisify(client.del).bind(client);
    var key = "content:" + site_id +":" + String(column_id) +":" + String(id)
//console.log(key)
    await delAsync(key)
    client.quit()
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