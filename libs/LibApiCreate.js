// LibApiCreate

//
export default {
  valid_post: function(data, coluValues){
    var ret =[]
    coluValues.forEach(function(item){
      if(item.name !=""){
//        console.log("name=" ,item.name)
        var d = Object.keys(data).indexOf(item.name)
        if(d !== -1){
//          ret[item.name] = data[item.name]
          var item ={
            name: item.name, value: data[item.name]
          }
          ret.push( item )
//          console.log("name=" ,item.name, data[item.name] )
        }        
      }
    })
    return ret
  },

}
