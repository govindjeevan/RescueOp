var url = 'https://rescue-op.herokuapp.com/api/spots/all';
var url_same_origin = '/api/spots/all';
var res;
fetch(url ,{mode: 'cors'}).then(function(data){
    //console.log(data.json());
    return data.json();
}).then(function(j) {
    var division = document.getElementById("spots");
    var node = document.createElement("UL");
    var i;
    res = j;
    for(i=0; i<j.length ; i++){
        li = document.createElement("LI");
        li.appendChild(document.createTextNode(j[i].geometry.coordinates));
        node.appendChild(li);
    }                                              
division.appendChild(node);
console.log(res[0].geometry.coordinates);

var mymap = L.map('mapin').setView([51.505, -0.09], 13);

const accessToken = 'pk.eyJ1IjoiZGFyc2hhbmR2IiwiYSI6ImNqbm5oMWw0bTBleGozcXBuMThlM3BnbmYifQ.yQmWeU0RSkbUzmFxEUVrlw';

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: accessToken
}).addTo(mymap);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 100
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);
marker.bindPopup("<b>Please help!</b><br>These are my co-ordinates.").openPopup();
    
});