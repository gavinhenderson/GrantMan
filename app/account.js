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

		changePassword : function(req, cb){
			require("./password.js").verifyHash(req.body.oldPassword, req.user.password, (err, res) => {
				if (err){
					cb(err);
					return;
				}
				if(!res){
					cb(res);
					return;
				}
				else{
					require("./password.js").generateHash(req.body.newPassword, (err, res) => {
						if(err){
							cb(err);
							return;
						}
						req.user.password = res;
						req.user.save();
					});
				}
			});
			
			cb()
		}
	}
};
