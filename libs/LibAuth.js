// LibAuth
//
export default {
  valid_auth:async function(){
  },
  get_user: function(users, mail){
    try{
//console.log( "mail=", mail );
      var ret = null
      users.forEach(function(item){
//console.log(item.id ,item.mail );
        if( item.mail === mail ){
          ret = item
        }
      });
      return ret
    } catch (e) {
      console.error(e);
      throw new Error('Error , get_user');
    }        
  },
  get_users: async function(firebase){
      try{
          var items = []
          return items
      } catch (e) {
          console.error(e);
          throw new Error('Error , get_users');
      }        
  },

}
