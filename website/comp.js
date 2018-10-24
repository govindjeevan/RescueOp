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