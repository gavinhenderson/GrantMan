// app/account.js
module.exports = {
  createUser : function(db, userDetails, cb){
    require('./password.js').generateHash(userDetails.password, (err, hash) => {
      if (err) {
        cb(err);
        return;
      }
      var newUsr = new db.model.User({
        staffID: userDetails.id,
        password: hash,
        email: userDetails.email,
        type: userDetails.type,
        name: userDetails.name,
        school: userDetails.school
      });
      cb();
    });
  }
}
