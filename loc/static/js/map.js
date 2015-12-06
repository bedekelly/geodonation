/*
var markerSet = [];
var myMarker = {pos: myPos, charity: "example", donationType: "Donation Box", amount: "Unkown"}
markerSet.push(myMarker);
myPos = {lat: 53.462, lng: -2.228}
var myMarker = {pos: myPos, charity: "Just giving 4 u", donationType: "QR Code", amount: "2.00"}
markerSet.push(myMarker);
*/

var myPos = {lat: 53.482, lng: -2.228}
var markerSet = [];

function getMarkerSet() {
  $.get(
      {
        url: "/donation",
        success: function(response) {
          markerSet = response;
          console.log(response);
        }
      }
    );
}
getMarkerSet();

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  center: myPos,
  zoom: 15
});

/*for (var i = 0; i < markerSet.length; i++) {
    addMarker(markerSet[i]);
  } */
}     

function addMarker(markerOb) {
  var marker = new google.maps.Marker({
    position: markerOb.pos,
    map: map,
    title: 'Hello World!'
  });

  var contentString = "Charity name: "+ markerOb.charity+"<br> Donation Type: "+markerOb.donationType+"<br> Amount Donated: "+markerOb.amount;


  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });


  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
} 

function genMarker() {
  var x = Math.random()/100;
  var y = Math.random()/100;
  var tempPos = {lat: myPos.lat+x, lng: myPos.lng+y}
  var charityA = "blah";
  var typeA = "atm";
  var amountA = "300";
  var myMarker = {pos: tempPos, charity: charityA, type: typeA, amount: amountA}
  addMarker(myMarker);
}

function createInfoWindow(marker, markerOb) {
    var contentString = "Charity name: "+ markerOb.charity+"\n Donation Type: "+markerOb.type+"\n Amount Donated: "+markerOb.amount;

    var infowindow = new google.maps.InfoWindow({
            content: contentString
  });
        infowindow.open(map, marker);

}





var mapload = false;
document.onreadystatechange = function(){
     if(document.readyState === 'complete' && !mapload){
        initMap();
        mapload = true;
        //genLoop = setInterval(genMarker, 2000);

     }
}

