const express = require('express');
const app = express();
const port = 8080;
app.use('/', require('./routes'));
// this by default will fetch routes/index.js files in index.js
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is running on port :${port}`)
})
