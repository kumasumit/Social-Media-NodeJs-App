const kue = require('kue');
const queue = kue.createQueue();
const addJobToQueue = (jobCategoryType, messageObject) => {
    console.log(jobCategoryType);
    console.log(messageObject);

    let job = queue.create(jobCategoryType, messageObject).save(function(err){
        if(err){console.log("Error in creating a queue", err);
        return;
    }
        console.log("job enqueued", job.id);
      })
}

// queue.on('job enqueue', function(id, type){
//     console.log( 'Job %s got queued of type %s', id, type );
   
//   }).on('job complete', function(id, result){
//     kue.Job.get(id, function(err, job){
//       if (err) return;
//       job.remove(function(err){
//         if (err) throw err;
//         console.log('removed completed job #%d', job.id);
//       });
//     });
//   });

//   queue.inactiveCount( function( err, total ) { // others are activeCount, completeCount, failedCount, delayedCount
//     if( total > 100000 ) {
//       console.log( 'We need some back pressure here' );
//     }
//   });




module.exports  = {addJobToQueue, queue};