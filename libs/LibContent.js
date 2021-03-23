//LibContent

//
export default {
  get_item : function(items, name){
    var ret = ""
    items.forEach(function(item){
//            console.log(item.id );
      if(item.name === name){
        ret = item.value
      }
    });        
    return ret
  },
  valid_contain : function(items , id){
    var ret = true
    items.forEach(function(item){
      if(item.id.toString()  === id){
//console.log( "ng.id=",item._id.toString(), id);
        ret = false
      }
    })
    return ret
  },
  getSearchItems : function(items , key , columns){
    var ret = []
    var self = this
    items.forEach(function(item){
      var values = item.values
      values.map((value_item, index) =>{
        var content_value = value_item.value
        var pos = content_value.indexOf(key)
        if(pos != (-1)){
//console.log( "items.id=", item._id);
          var valid = self.valid_contain(ret, item.id.toString( ))
//console.log( "value=",item._id ,value_item.value );
          if(valid){ ret.push(item) }
        }
      })
    });
    return ret    
  },   
  get_name_items:function(items, name){
    var ret = [];
    items.forEach(function(item){
//        console.log( item );
      if(item.name === name){
        ret.push( item )
      }
    });
    return ret;        
  },    
}
