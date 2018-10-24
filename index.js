const express=require('express');
// set up express app
const mongoose=require('mongoose');
const app=express();
const routes=require('./routes/api')
const bodyParser =require('body-parser')
var morgan = require('morgan');  
var passport = require('passport');  
var config = require('./config/main');  
var User = require('./models/user');  
var jwt = require('jsonwebtoken');  

//connect to mongoDB
mongoose.connect(config.database); 
mongoose.Promise = global.Promise;

app.use(express.static('public'));


require('./config/passport')(passport);  
app.use(passport.initialize());  


// body parser before routes since it needs to extract data before url is routed
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

app.use(morgan('dev'));  

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.use('/api',routes);

// erro handling middle-ware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message})
})

app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

