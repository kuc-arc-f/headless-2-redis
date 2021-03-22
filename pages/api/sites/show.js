const redis = require("redis");
const {promisify} = require('util');
const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
//
export default async function (req, res){
  try{
    var id = req.query.id
//console.log("id=", id );
    var reply = await getAsync("site:" + id);
    var item = await JSON.parse(reply || '[]')    
//console.log(item);
    var ret ={
      item: item,
      apikey : "",
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};