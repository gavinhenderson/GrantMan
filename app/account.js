var password = require('./password');
// app/account.js
module.exports = (db) => {
	return {
		createUser : function(userDetails, cb){
			require("./password.js").generateHash(userDetails.password, (err, hash) => {
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
				newUsr.validate((err) => {
					if (err) return cb(err);

					newUsr.save((err,user) => {
						cb(err, user);
					});
				});
			});
		},

		changePassword : function(body, user, cb){
			require("./password.js").verifyHash(body.oldPassword, user.password, (err, res) => {
				if (err){
					cb(err);
					return;
				}
				if(!res){
					cb(new Error("Password doesn't match"));

					return;
				}
				else{
					require("./password.js").generateHash(body.newPassword, (err, res) => {
						if(err){
							cb(err);
							return;
						}
						user.password = res;
						user.save();
						cb();
					});
				}
			});
		},

		createUserWithToken: function(email, type, school, cb){
			var user;

			// Generate a token
			password.generateHash(email, (err, token) => {

				// Create the user model
				user = new db.model.User({
					email: email,
					type: type,
					school: school,
					token: token
				});

				cb(err, user);
			});
		}
	}
};
