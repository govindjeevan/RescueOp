const express=require('express');
// set up express app
const mongoose=require('mongoose');
const app=express();
const routes=require('./routes/api')
const bodyParser =require('body-parser')


//connect to mongoDB
mongoose.connect('mongodb://localhost/spotgo');
mongoose.Promise = global.Promise; 


// body parser before routes since it needs to extract data before url is routed
app.use(bodyParser.json());

app.use('/api',routes);

// erro handling middle-ware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message})
})

//listen for requests
app.listen(process.env.port || 5000,function(){
    console.log("Started Server");
});

