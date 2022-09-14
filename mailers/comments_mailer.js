const nodemailer = require('../config/nodemailer');
//this is another way of exporting a method
exports.newComment = (comment) =>{
    console.log("Inside newComment mailer");
    console.log(comment);
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    //sendmail is a predefined function
    nodemailer.transporter.sendMail({
    from: 'kumarsumit1989@gmail.com', // sender address
    to: comment.userId.email, // list of receivers
    subject: "New Comment Published", // Subject line
    text: "New Comment Published", // plain text body
    html:htmlString, // html template
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