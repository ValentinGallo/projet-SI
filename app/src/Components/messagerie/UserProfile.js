var UserProfile = (function() {
    var user = {
      id:0
    };
  
    var getUser = function() {
      return user;    // Or pull this from cookie/localStorage
    };

    var getId = function() {
      return user.id;
    };
  
    var setUser = function(newUser) {
        user = newUser;     
      // Also set this in cookie/localStorage
    };
  
    return {
        getUser: getUser,
        setUser: setUser,
        getId: getId
    }
  
  })();
  
  export default UserProfile;