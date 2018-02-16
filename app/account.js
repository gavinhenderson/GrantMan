// app/account.js
module.exports = {
  createUser : function(userDetails,cb){
    require('./password.js').generateHash(userDetails.password, (err, hash) => {
      const mongoose = require("mongoose");
      const db = require("./database.js")(mongoose);
      var newUsr = new db.model.User({
        staffID: userDetails.id,
        password: hash,
        email: userDetails.email,
        type: userDetails.type,
        name: userDetails.name,
        school: userDetails.school
      });
      cb(newUsr);
    });
  }
}
