const redis = require("redis");
const {promisify} = require('util');
//
export default async function (req, res){
  try{
//console.log(req.query);
    const client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);
    var id = req.query.id
    var site_id = req.query.site_id
    var key = "content:" + site_id +":"+ String(id)
//console.log("key=" , key)
    var reply = await getAsync(key);
//console.log(reply)
    var item = await JSON.parse(reply || '[]')        
//console.log(item)
    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};