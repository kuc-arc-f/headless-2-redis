const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
import LibRedis from '../../../libs/LibRedis'
import LibCommon from '../../../libs/LibCommon'

//
export default async (req, res) => {
  try{
    const client = redis.createClient();
    var data = await LibRedis.get_keys_items(client, "user:*")
//console.log(data.length)   
    client.quit() 
    res.json({count: data.length })
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
