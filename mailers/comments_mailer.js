const { sendEmail, renderTemplate } = require('../email_service/nodemailer');
//this is another way of exporting a method
exports.newComment = (comment) => {
    console.log("Inside newComment mailer");
    console.log(comment);
    let htmlString = renderTemplate(
        {comment: comment}, '/comments/new_comment.ejs');
    
sendEmail({
    from: 'kumarsumit1989@gmail.com', // sender address
    to: comment.userId.email, // list of receivers
    subject: "New Comment Published", // Subject line
    text: "New Comment Published", // plain text body
    htmlString:htmlString, // html template
});
}