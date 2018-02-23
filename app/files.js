const fs = require("fs");

function replaceFile(filePath, file, cb) {
	fs.exists(filePath, (exists) => {
		// Delete the file if it exists
		console.log(filePath);
		if (exists) {
			fs.unlink(filePath, (err) => {
				if (err) return cb(err);

				file.mv(filePath, cb);
			});
		} else {
			file.mv(filePath, cb);
		}
	});
}

const basePath = "public/files/";

//saves or creates files
module.exports = (fileName, file, objectId, cb) => {
	var objBasePath = basePath + objectId;

	// Make the obj folder if non existant
	if(!fs.existsSync(objBasePath)){
		fs.mkdirSync(objBasePath);
	}

	replaceFile(objBasePath + "/" + fileName, file, cb);
};
