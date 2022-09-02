const express = require('express');
const app = express();
const port = 8080;
app.use('/', require('./routes'));
// this by default will fetch routes/index.js files in index.js
app.set('view engine', 'ejs');
//this will set ejs as the view engine
app.set('views', './views');
// this will set views to look for views in the views folder
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is running on port :${port}`)
})
