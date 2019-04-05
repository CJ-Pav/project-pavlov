// Project Pavlov

/* Required packages */
const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectMongo = require('connect-mongo')(session);

/* Configuration */
var app = express();
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');
app.use(express.static("./public/"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// var mongoUri = process.env.MONGO_URI || 'mongodb://cs290_hollenbt:secret123@classmongo.engr.oregonstate.edu/cs290_hollenbt';
// mongoose.connect(mongoUri, {useMongoClient: true});
// app.use(session({
//     secret: 'There is no secret, only prolixity.',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // cookie expires in seven days
//     store: new connectMongo({ mongooseConnection: mongoose.connection })
// }));
// var Account = require('/../models/account.js');


/* GET middleware */
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/home', function(req, res) {
    res.redirect('/');
    // if (!req.session.data)
    //     res.redirect('/');
    // else if (!req.session.data.userName)
    //     res.redirect('/logIn');
    // else res.render('home', req.session.data);
});

app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.post('/sign-in', function(req, res, next) {
    res.render('newUser');
});

/* Error Handler */
app.use(function(err, req, res, next) {
    res.status(500);
    res.type("text/plain");
    res.send("Error:\n\n" + err.stack);
});

/* Page Not Found */
app.use(function(req, res) {
    res.status(404);
    res.render('404Page');
});

app.listen(process.env.PORT || 3002);
