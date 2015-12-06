function noLocation() {
    alert('Could not find location');
};

function foundLocation(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
};

function getLocation() {
    navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
};

