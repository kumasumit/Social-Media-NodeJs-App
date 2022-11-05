const { sendEmail, renderTemplate } = require('../email_service/nodemailer');
//this is another way of exporting a method
exports.newToken = (tokenData) => {
    console.log("Inside new token mailer");
    let htmlString = renderTemplate(
        {tokenData: tokenData}, '/reset_mail/reset_mail.ejs');

        console.log(htmlString);

sendEmail({
    from: 'kumarsumit1989@gmail.com', // sender address
    to: tokenData.userId.email, // list of receivers
    subject: "Reset Email Subject", // Subject line
    text: "Forget your password", // plain text body
    htmlString : htmlString, // html template
});
}