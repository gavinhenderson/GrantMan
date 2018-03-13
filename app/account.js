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
					cb(res);
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
						cb(true);
					});
				}
			});
		}
	}
};
