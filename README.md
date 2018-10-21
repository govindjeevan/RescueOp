# Rescue-Op
### Context
The out-break of floods in kerala, kodagu and the north eastern states of India has highlighted how technology can be leveraged to tackle natural calamities and cushion the fall.

A major challenge during the crisis was communication. The district helplines in kerala were insufficient to report the pleas of the thousands who were stranded in various parts of kerala overnight due to the floods, with water levels surging by the minute.

Even with the introduction of several official and un-official helplines, several of those who were stranded were left without help as the lines always responded as engaged.

A web portal was introduced to submit requests for help, however the system was not designed to function at a localized level to aid the local rescue operations in pin pointing the locations of those who need rescuing.

### Proposed Solution

A geo-tagging based system that connects rescue teams with the flood victims in the region of operation.

#### 1. Victim Side
The flood victims will have a web-app/android-app interface to request help.
This would be minimal load and fetches the co-ordinates using the phone's GPS, and relays it to the central information server coupled with user filled information. (eg. no of victims stranded)
- Send Requests for help
- Be alterted by rescue team broadcasts ( Push notification and Rings )
- Reject help when broadcast arrives if already rescued.
#### 2. Rescue Team Side
A Map based interface that indicates the positions of all victims within a radius of the team location ( eg. Rescue Helicopter ).
- Can view details of each request on the map
- Can send a 'broadcast' to all requests on the map, creating alerts (push notifications) on the victim apps. (eg. Rescue Team Approaching. Please move to the building roofs )
- Mark requests as rescued once done.

#### 3. Control Center
Will have access to all submitted requests independent of location, but sortalble by location. Can dispatch rescue teams to locations after analyzing the requests.


The Victim side app will be freely distributed.
The Rescue Team app will enable a user to sign up as a rescuer, subject to approval  and verification by the Control Center.


# API Usage

## Setup

    cd RescueOp/rest
    npm install 	//installs dependencies
    nodemon index 	//start server


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

 

>    localhost:5000/api/spots/

    {
	"name": "Govind",
	"contact": "9495591168",
	"geometry": {"coordinates": [-79.789,25.01]}
    }
Count defaults to 1.
Rescued defaults to false.


## GET

### All Spots

> localhost:5000/api/spots/all

### Spots near a Centre Point

> http://localhost:3000/api/spots/?lng=-80&lat=25&dist=100000

All spots within a circle centred at [-80,25]=[lng,lat] with a radius of 100,000 mts

## PUT

To change the status of rescued, which by default is false when created.

> localhost:5000/api/spots/:id

    {
    	"rescued":true
    }

Returns new document with updated index.




