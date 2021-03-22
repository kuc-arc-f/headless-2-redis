//
const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();
//
export default async (req, res) => {
  try{
    var retArr= {ret:0, user_id:0}
    var data = req.body
    var token =data._token
// console.log(token)
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }else{
      console.log("OK, CSRF")
      retArr.ret = 1
    }
    return res.json(retArr);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}


