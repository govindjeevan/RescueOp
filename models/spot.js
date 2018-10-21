const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// create geolocation schema

const GeoSchema = new Schema({
    type: {
        default: "Point",
        type: String
    },
    coordinates: {
        type: [Number],
        index: "2dsphere",
        required: [true,"Location Field is Required"]

    }
})


// create spot schema and model

const SpotSchema = new Schema({
    name: {
        type: String,
        required: [true,"Name Field is Required"]
    },
    count:{
        type: Number,
        default: 1
    },

    contact:{
        type: String,
        required: [true, "Phone Number is Required"]
    },
    rescued:{
        type: Boolean,
        default: false
    },

    geometry: GeoSchema

    // add in Geo location

    
});

const Spot = mongoose.model('spot', SpotSchema);

// export the model
module.exports=Spot;