const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();

const redis = require("redis");
const {promisify} = require('util');
import LibCommon from '../../../libs/LibCommon'
import LibAuth from '../../../libs/LibAuth'
//
export default async (req, res) => {
  try{
    if (req.method === "POST") {
      var retArr= {ret:0, user_id:0}
      var data = req.body
//console.log(data)
      if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
        throw new Error('Invalid Token, csrf_check');
      }
      const client = redis.createClient();
      const keysAsync = promisify(client.keys).bind(client);
      const mgetAsync = promisify(client.mget).bind(client);
      var reply_items = []
      var items = await keysAsync("user:*");
      if(items.length > 0){
        reply_items = await mgetAsync(items);
        reply_items = LibCommon.string_to_obj(reply_items)
      }
//console.log(reply_items)        
      var item = LibAuth.get_user(reply_items, data.mail)
      if(item == null){ return res.json(retArr); }
console.log(item)        
      if (data.mail === item.mail
        && bcrypt.compareSync(data.password,  item.password )){
          retArr.ret = 1
          item.password = ""
          retArr.user = item
          return res.json(retArr);
      }else{
        return res.json(retArr);
      } 
    }
    return res.status(404).send("");
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
