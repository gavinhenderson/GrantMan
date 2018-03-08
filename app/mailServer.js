var ejs = require("ejs");

module.exports = (mail) => {
  return {
    sendEmail: (subject, to, template, templateData, cb)=>{

      ejs.renderFile(__dirname + "/../views/"+template+".ejs", templateData, (err, data)=> {
        if(err) console.log(err);

        let mailOptions = {
          from: '"Grant Man Notify" <grant.man.notify@gmail.com>', // sender address
          'to': to, // list of receivers
          'subject': subject, // Subject line
          html: data // html body
        };

        // send mail with defined transport object
        mail.sendMail(mailOptions, (error, info) => {
           if (error) {
               return console.log(error);
           }
        });
      })
    }
  }
}
