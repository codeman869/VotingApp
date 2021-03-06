'use strict'
const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
//let MongoStore = require('connect-mongo')(express);

const models = join(__dirname, 'app/models');

const port = process.env.PORT || 3000;
const app = express();
//module.exports = app;

//Bootstrap Models
fs.readdirSync(models).filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models,file)));



//const apiroutes = require('./controllers');
//const signup = require('./authentication/signup');
//const login = require('./authentication/login');

//let User = require('./models/user');


//let port = process.env.PORT || 3000;

//let app = express();
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
*/
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/votetesting');

/*
app.use(session({
    store: new MongoStore({
        db: 'voting',
        host: 'localhost',
        port: 27017
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: false
}));
*/
/*
app.use(expressSession({
    secret: process.env.SECRET || 'testsecret'
}))
*/
/*
app.use(passport.initialize());
app.use(passport.session());
*/
/*
passport.serializeUser((user,done) => {
   done(null,user._id); 
});

passport.deserializeUser((id,done) => {
    User.findById(id, (err,usr) => {
        done(err,usr);
    });
});
*/
//signup(passport);
//login(passport);

/*
app.use('/api', apiroutes);

app.get('/', (req,res) => {
    res.send('Hello World!');
});
*/

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//app.use('/bootstrap', express.static(path.join('node_modules', 'bootstrap', 'dist' )));
//app.use('/jquery', express.static(path.join('node_modules', 'jquery', 'dist')));
//app.use('/scripts', express.static(path.join('public', 'scripts')))
//app.use('/chartJS', express.static(path.join('node_modules', 'chart.js', 'dist')));

require('./config/passport')(passport)
require('./config/express')(app,passport)
require('./config/routes')(app, passport);
//const routes = require('./routes/index')(passport);

//app.use('/', routes);

let server = app.listen(port, () => console.log(`Application running on port: ${port}`));

module.exports = app;

/*
exports.closeServer = function() {
    server.close();
    mongoose.connection.close();
}
*/