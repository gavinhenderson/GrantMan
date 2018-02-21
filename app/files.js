const fs = require('fs');

//saves or creates files
module.exports = (spreadsheet, doc, objectid, cb) => {
  var exists = fs.existsSync("public/files/"+objectid);

  if(!exists){
    fs.mkdirSync("public/files/"+objectid);
  }

  //Only run if spreadsheet != null
  if(spreadsheet){
    //fs.writeFileSync("public/files/"+objectid+"/spreadsheet.xls",spreadsheet);
    spreadsheet.mv("public/files/"+objectid+"/spreadsheet.xls", err => {
      //only run if doc != null
      if(doc){
        //fs.writeFileSync("public/files/"+objectid+"/brief.doc",doc);
        doc.mv("public/files/"+objectid+"/brief.doc", err => {
          cb(err);
        });
      }
    });
  }
}
