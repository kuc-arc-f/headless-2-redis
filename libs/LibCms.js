// LibCms

//
export default {
  get_const: function(){
      return {
          aa: "aaa",
      }
  },
  get_show_item: function(items, id){
      var ret = null;
      items.forEach(function(item){
//console.log(item.show_id );
          if(item.show_id === String(id) ){
              ret = item
          }
      });
      return ret
  }, 
  get_page_item: function(items, id){
      var ret = null;
      items.forEach(function(item){
//console.log(item.show_id );
          if(item.save_id === String(id) ){
              ret = item
          }
      });
      return ret
  },        
  get_category_item: function(items, id){
      var ret = {
          id: 0,
          name: "",
          save_id: "id0",
      };
      items.forEach(function(item){
//console.log(item.show_id );
          if(item.save_id === String(id) ){
              ret = item
          }
      });
      return ret
  },    
  get_colmun_items: function(items, id){
    var ret = [];
    items.forEach(function(item){
//console.log(item.category.save_id );
        if(item.column_id === String(id) ){
            ret.push(item)
        }
    });
    return ret
  },
  get_category_data: function(items, id){
      var ret = [];
      items.forEach(function(item){
//console.log(item.category.save_id );
          if(item.category.save_id === String(id) ){
              ret.push(item)
          }
      });
      return ret
  },

}
