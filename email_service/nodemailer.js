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
    console.log("==========================");
    console.log(data);
    console.log("==========================");

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

  const sendEmail = (emailDetails) => {
    const {to, from, subject,text, htmlString} = emailDetails;

  //sendmail is a predefined function
  transporter.sendMail({
    from:from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: htmlString, // html template
    }, (err, info)=>{
        //this is the callback function
        // err is simply error
        //info is the info about the request being sent
        if(err){
            console.log("Error in sending mail", err);
            return;
        }
        console.log('Message sent', info);
        return;
    })

  }
  module.exports= {
    renderTemplate: renderTemplate,
    sendEmail: sendEmail,
  }