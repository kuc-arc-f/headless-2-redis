const redis = require("redis");
const {promisify} = require('util');
//
export default async function (req, res){
  try{
    const client = redis.createClient();
    const getAsync = promisify(client.get).bind(client);
    var id = req.query.id
//console.log("id=", id );
    var reply = await getAsync("site:" + id);
    var item = await JSON.parse(reply || '[]')    
//console.log(item);
    var ret ={
      item: item,
      apikey : "",
    }
    client.quit()
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};