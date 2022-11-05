const {queue} = require('./kue');
const commentsMailer = require('../mailers/comments_mailer');
const tokensMailer = require('../mailers/tokens_mailer');

queue.process('emails', function(job, done){
    //here emails is the name of task queue
    console.log('emails worker is processing a job', job.data);
    commentsMailer.newComment(job.data);
    done();
})

queue.process('resetEmails', function(job, done){
    console.log(">>>>>>> start of resetEmails worker");
    console.log(job.data);
    console.log(" end of resetEmails worker <<<<<<<<");

    
    //here emails is the name of task queue
    console.log('reset emails worker is processing a job', job.data);
    tokensMailer.newToken(job.data)
    console.log(job.data);
    done();
})



