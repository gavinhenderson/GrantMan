const fs = require('fs');

//saves or creates files
module.exports = (spreadsheet, doc, objectid, cb) => {
  var exists = fs.existsSync("public/files/"+objectid);

  if(!exists){
    fs.mkdirSync("public/files/"+objectid);
  }

  //Only run if spreadsheet != null
  if(spreadsheet){

    //Delete file if it exists
    if(fs.existsSync("public/files/"+objectid+"/spreadsheet.xls")){
      fs.unlinkSync("public/files/"+objectid+"/spreadsheet.xls")
    }

    //save spreadsheet
    spreadsheet.mv("public/files/"+objectid+"/spreadsheet.xls", err => {
      //give callback error
      if(err){
        cb(err);
      }

      //only run if doc is given
      if(doc){

        //delete doc if it exists
        if(fs.existsSync("public/files/"+objectid+"/brief.doc")){
          fs.unlinkSync("public/files/"+objectid+"/brief.doc")
        }

        //save brief
        doc.mv("public/files/"+objectid+"/brief.doc", err => {
          cb(err);
        });
      }else{
        cb();
      }
    });
  }else{
    //only run if doc is given
    if(doc){

      //delete doc if it exists
      if(fs.existsSync("public/files/"+objectid+"/brief.doc")){
        fs.unlinkSync("public/files/"+objectid+"/brief.doc")
      }

      //save brief
      doc.mv("public/files/"+objectid+"/brief.doc", err => {
        cb(err);
      });
    }else{
      cb();
    }
  }
}
