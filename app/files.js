const fs = require('fs');

//saves or creates files
module.exports = (spreadsheet, doc, objectid) => {
  var exists = fs.existsSync("public/files/"+objectid);

  if(!exists){
    fs.mkdirSync("public/files/"+objectid);
  }

  //Only run if spreadsheet != null
  if(spreadsheet){
    fs.writeFileSync("public/files/"+objectid+"/spreadsheet.xls",spreadsheet);
  }

  //only run if doc != null
  if(doc){
    fs.writeFileSync("public/files/"+objectid+"/brief.doc",doc);
  }

}
