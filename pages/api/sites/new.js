var csrf = require('csrf');
var tokens = new csrf();
const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();
const incrAsync = promisify(client.incr).bind(client);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

import LibSite from "../../../libs/LibSite"
import LibRedis from "../../../libs/LibRedis"
//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var token =data._token
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }
    LibRedis.init(client)
    var replyIdx = await incrAsync("idx-site");
    var apikey = LibSite.get_apikey()

    var item = {
      id: replyIdx,
      name: data.name ,  
      content: data.content ,
      user_id: "",
      created_at: new Date(),
      apikey: apikey,
    };
//console.log(item)  
    var key = "site:" + String(replyIdx)
//console.log( key );
//    client.zadd("sorted_sites" , replyIdx , key );
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

