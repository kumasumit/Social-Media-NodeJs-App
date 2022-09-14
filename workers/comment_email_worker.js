const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
queue.process('emails', function(job, done){
    //here emails is the name of task queue
    console.log('emails worker is processing a job', job.data);
    commentsMailer.newComment(job.data);
    done();
})