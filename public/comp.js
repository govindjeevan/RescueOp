// import React from 'react';
// var React = require('react');

// var Spots = React.createClass({
//     getInitialState : function(){
//         return ({
//             spots : []
//         });
//     },

//     componentDidMount: function(){
//         fetch('https://rescue-op.herokuapp.com/api/spots/all').then(res=>{
//             console.log(res);
//             return res.json()
//         }).then(spots=>{
//             console.log(spots);this.setState({spots: spots});
//         });
//     },

//     render : function() {
//         var spots = this.state.spots;
//         spots = spots.map(function(spot, index){
//             return (
//             // <li key={index}>
//             //     <span>{spot.obj.name}</span>
//             // </li>
//             spots
                
//             );
//         });
//         return(
//         //     <div id = "spotdiv">
//         //         <button type="button" onclick={this.handleSubmit}>All spots</button>
//         //         <ul>{spots}</ul>
//         // </div> 
//         spots
//         );
//     }
// });

var url = 'https://rescue-op.herokuapp.com/api/spots/all';
var url_same_origin = '/api/spots/all';
fetch(url ,{mode: 'cors'}).then(function(data){
    //console.log(data.json());
    return data.json();
}).then(function(j) {
    var division = document.getElementById("spots");
    var node = document.createElement("UL");
    var i;
    for(i=0; i<j.length ; i++){
        li = document.createElement("LI");
        li.appendChild(document.createTextNode(j[i]._id));
        node.appendChild(li);
    }                                              
division.appendChild(node);
    console.log(j);
    
});