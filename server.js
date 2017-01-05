'use strict'

//Require express library
const express = require('express');
//Express supports a bunch of templating engines ( hogan, jade, Handlebars)
//For sake of tutorial going to use handlebars
var hbs = require('hbs');
var bodyParser = require('body-parser');
//Load the application
//var statusEngine = require('./status');
//what port do we want our application to run
const PORT = 5656;
//Setup express object
const app = express();

//Set out view engine extension by default it uses templating engine (.hbs in handlevars case)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);
//If we try to navigate to a resource first checks in public folder we will use this to direct looking for css and JS ( bootstrap)
app.use(express.static('public'))

// This route is going to run each time, this can be extremely useful for error checking before it moved on (via next())
router.use(function(req, rest, next){
   console.log('Request recieved');
   next();
});

// This is our default route as stated above i left this as / so i could get experience using full urls
router.get('/', function(req,res){
   //res.sendFile('index')
   res.render('index',{title:"Home"});
});

app.listen(PORT);
