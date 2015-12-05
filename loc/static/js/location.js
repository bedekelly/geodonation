function noLocation() {
    alert('Could not find location');
};

function foundLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    alert("LAT : "+lat +", LONG : "+long);
};

function getLocation() {
    navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
};

