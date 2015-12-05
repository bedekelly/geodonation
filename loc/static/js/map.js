var markersPos = [];

var myPos = {lat: 53.462, lng: -2.228}
markerPos.push(myPos);
myPos = {lat: 54.462, lng: -2.228}
markerPos.push(myPos);
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPos,
    zoom: 15
  });

  for (var i = 0; i < markerPos.length; i++) {
    var marker = new google.maps.Marker({
      position: markerPos[i],
      map: map,
      title: 'My position'
    });        
  }
}    

initMap();