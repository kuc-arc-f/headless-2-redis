// 
const {promisify} = require('util');
import LibCommon from '../libs/LibCommon'
//
export default {
  init: function(client){
    try{
      client.on("error", function(error) {
        console.error(error);
      });
    } catch (e) {
      console.log(e);
      throw new Error('error, init');
    }
  },
  get_keys_items:async function(client, keys){
    try{
      const keysAsync = promisify(client.keys).bind(client);
      const mgetAsync = promisify(client.mget).bind(client);
      var data = await keysAsync(keys);
      var reply_items = []
      if(data.length > 0){
        reply_items = await mgetAsync(data);
      }  
      reply_items = LibCommon.string_to_obj(reply_items)
      return reply_items    
    } catch (e) {
      console.log(e);
      throw new Error('error, get_keys_items');
    }
  },  
  get_item: function(items, id){
    try{
      var ret = null;
      items.forEach(function(item){
//console.log(item);
        if(parseInt(item.id) === parseInt(id) ){
          ret = item
        }
      });
      return ret      
    } catch (e) {
      console.log(e);
      throw new Error('error, get_item');
    }
  },
  replace_item: function(items, id, row){
    try{
      var retItems = [];
      items.forEach(function(item){
// console.log("item.id="+item.id+ ", id=" + id);
          if(parseInt(item.id) === parseInt(id) ){
            item.title = row.title
            item.content = row.content
            retItems.push(item)
          }else{
            retItems.push(item)
          }

      });
      return retItems      
    } catch (e) {
      console.log(e);
      throw new Error('error, get_item');
    }
  },
  delete_item: function(items, id){
    try{
      var retItems = [];
      items.forEach(function(item){
          if(parseInt(item.id) != parseInt(id) ){
//console.log("item.id="+item.id+ ", id=" + id);
            retItems.push(item)
          }
      });
      return retItems      
    } catch (e) {
      console.log(e);
      throw new Error('error, get_item');
    }
  },
  get_reverse_items: function(items){
    var data =[]
    items.forEach(function(item){
//console.log(date)
        data.unshift(item)                        
    });        
    return data
  },

}