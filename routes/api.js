const express=require('express');
const router=express.Router();
const Spot = require ('../models/spot')
var User = require('../models/user');  
var passport = require('passport');  

var jwt = require('jsonwebtoken');
var config = require('../config/main');  


router.get('/',function(req,res,next){
        res.send("HELLO");
});

router.post('/register', function(req, res) {  
    if(!req.body.email || !req.body.password) {
      res.json({ success: false, message: 'Please enter email and password.' });
    } else {
      var newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
  
      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({ success: false, message: 'That email address already exists.'});
        }
        res.json({ success: true, message: 'Successfully created new user.' });
      });
    }
  });



router.post('/authenticate', function(req, res) {  
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 10080 // in seconds
            });
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        });
      }
    });
  });


  // Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {  
    res.send('It worked! User id is: ' + req.user._id + '.');
  });
  


router.get('/spots/all',function(req,res,next){
    Spot.find({}).then(function(spots){
        res.send(spots);
    })
});

router.get('/spots', function(req, res, next){
    Spot.aggregate().near({ 
     near: 
     {
      'type': 'Point',
       'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)] }, 
       maxDistance: parseFloat(req.query.dist), 
       spherical: true, 
       distanceField: "dis" 
      }
      ).then(function(spots){
      res.send(spots);
       });
   });
router.post('/spots',function(req,res,next){
    Spot.create(req.body).then(function(spot){
        res.send(spot)
    }).catch(next);
});

router.put('/spots/:id',function(req,res,next){
    Spot.findByIdAndUpdate({_id: req.params.id},req.body).then(
        function(){
            Spot.findOne({_id: req.params.id}).then(function(spot){
                res.send(spot);
            })
        }
    );
    });

router.delete('/spots/:id',function(req,res,next){
    
    Spot.findByIdAndRemove({_id: req.params.id}).then(
        function(spot){
            res.send(spot);
        }
    )

});


module.exports = router;