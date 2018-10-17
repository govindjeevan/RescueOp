const express=require('express');
const router=express.Router();
const Spot = require ('../models/spot')
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
       maxDistance: 10000000, 
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