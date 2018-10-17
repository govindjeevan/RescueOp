# API Usage

## Setup

cd rest
npm install
nodemon index


## Schema

{
    name: {
        type: String,
        required: [true,"Name Field is Required"]
    },
    count:{
        type: Number,
        default: 1
    },
    
    rescued:{
        type: Boolean,
        default: false
    },

    geometry: GeoSchema
    
}


## POST

localhost:5000/api/spots/

{
	"name": "Govind",
	"geometry": {"coordinates": [-79.789,25.01]}
}


## GET

### All Spots
localhost:5000/api/spots/all

### Spots within distance

localhost:5000/api/spots/?lng=-80&lat=25

### PUT

To change the status of rescued, which by default is false when created.

localhost:5000/api/spots/:id

{
	"rescued":true
}

Returns new document with updated index.
