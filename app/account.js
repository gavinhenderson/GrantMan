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

<<<<<<< HEAD
		changePassword : function(req, cb){
			require("./password.js").verifyHash(req.body.oldPassword, req.user.password, (err, res) => {
=======
		changePassword : function(body, user, cb){
			require("./password.js").verifyHash(body.oldPassword, user.password, (err, res) => {
>>>>>>> cb41d0085639429359c23f537922b18c4089a96a
				if (err){
					cb(err);
					return;
				}
				if(!res){
					cb(res);
					return;
				}
				else{
<<<<<<< HEAD
					require("./password.js").generateHash(req.body.newPassword, (err, res) => {
=======
					require("./password.js").generateHash(body.newPassword, (err, res) => {
>>>>>>> cb41d0085639429359c23f537922b18c4089a96a
						if(err){
							cb(err);
							return;
						}
<<<<<<< HEAD
					});
				}
			});

			console.log(req.user);
			console.log(req.body);
			cb()
=======
						user.password = res;
						user.save();
						cb(true);
					});
				}
			});
>>>>>>> cb41d0085639429359c23f537922b18c4089a96a
		}
	}
};
