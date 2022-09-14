const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'kumarsumit1989@gmail.com', // generated ethereal user
      pass: 'rmgilcfzzbnhsoox', // generated ethereal password
    },
  });

  let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath), 
        //relativePath is the place from this function is being called
        data,
        //here data is the context that we pass to the ejs
        function(err, template){
            //this is the callback
            if(err){
                console.log("Error in rendering template", err);
                return;
            }
            //if no error
            mailHTML = template;
        }

    )
    return mailHTML;
  }

  module.exports= {
    transporter: transporter,
    renderTemplate: renderTemplate
  }