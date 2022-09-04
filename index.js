const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const MongoStore = require('connect-mongo');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./assets')) // for getting static files in root/assets folder
app.use(expressLayout);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views')
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'FriendBook',
    //todo change the secret in production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/friendBook-development' })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//routes middleware will be at the bottom
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`error in running the ${port}`)
        return;
    }
    console.log(`Server is running @ ${port}`)
})