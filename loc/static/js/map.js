var myPos = {lat: 53.48, lng: -2.22}
var markerSet = new Array();
var map;


function addMarker(markerOb, index, array) {
    var marker = new google.maps.Marker({
	position: markerOb.pos,
	map: map,
	title: charityId,
    });

    var contentString = "Charity ID: " + charityId + "<br> Donation Type: " + markerOb.type;

    if (markerOb.amount !== "Unknown") {
	contentString = contentString + "<br> Amount Donated: " + markerOb.amount;
    }

    var infowindow = new google.maps.InfoWindow({
	content: contentString
    });


    marker.addListener('click', function() {
	infowindow.open(map, marker);
    });
}


function getMarkerSet() {
    $.get(
	{
	    url: "/donation/" + charityId,
	    success: function(response) {
		map = new google.maps.Map(document.getElementById('map'), {
		    center: myPos,
		    zoom: 15
		});
		markerSet = $.makeArray(response);
		markerSet.forEach(addMarker);
	    }
	}
    );
}




function initMap() {
    getMarkerSet();
}


function createInfoWindow(marker, markerOb) {
    var contentString = "Charity name: "+ charityId +"\n Donation Type: "+markerOb.type+"\n Amount Donated: "+markerOb.amount;
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infowindow.open(map, marker);
}

var mapload = false;
document.onreadystatechange = function(){
    if(document.readyState === 'complete' && !mapload) {
        initMap();
        mapload = true;
    };
};

