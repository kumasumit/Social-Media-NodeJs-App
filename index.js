const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const expressLayout = require('express-ejs-layouts');
app.use(expressLayout)
const db = require('./config/mongoose')
app.use(bodyParser.urlencoded({extended: false}));
app.use('/',require('./routes'))
app.use(express.static('./assets')) // for getting static files in root/assets folder
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)
app.set('view engine','ejs');
app.set('views','./views')
app.listen(port,function(err){
    if(err){
        console.log(`error in running the ${port}`)
        return;
    }
    console.log(`Server is running @ ${port}`)
})