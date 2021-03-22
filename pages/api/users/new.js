const bcrypt = require('bcrypt');
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
    var data = req.body
    let hashed_password = bcrypt.hashSync(data.password, 10);
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }   
    LibRedis.init(client)
    var replyIdx = await incrAsync("idx-user");
    var item = {
      id: replyIdx,
      mail: data.mail,
      password: hashed_password,
      name: data.name,
      created_at: new Date(),
    }   
//console.log(item);
    var key = "user:" + String(replyIdx)
//console.log( key );
    var json = JSON.stringify( item );
    await setAsync(key , json)    
    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};