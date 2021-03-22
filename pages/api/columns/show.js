const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
//
export default async function (req, res){
  try{
//console.log( req.query );
//    console.log("id=", req.query.id);
    var id = req.query.id
    var site_id = req.query.site_id
    var key = "column:" + site_id + ":" + id
    var reply = await getAsync(key);
    var item = await JSON.parse(reply || '[]')    
    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};