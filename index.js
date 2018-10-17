const express=require('express');
// set up express app
const mongoose=require('mongoose');
const app=express();
const routes=require('./routes/api')
const bodyParser =require('body-parser')


//connect to mongoDB
mongoose.connect('mongodb://admin:sos123@ds044979.mlab.com:44979/spotgo');
mongoose.Promise = global.Promise; 


// body parser before routes since it needs to extract data before url is routed
app.use(bodyParser.json());

app.use('/api',routes);

// erro handling middle-ware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message})
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

