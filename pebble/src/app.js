var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var LAT = 0;
var LONG = 0;

var main = new UI.Card({
  title: 'GeoDonate',
  icon: 'images/dHexagon.png',
  subtitle: 'Controls: ',
  body: '>> Up - Register a donation. \n >> Down - More info.'});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Oxfam',
        icon: 'images/cHexagon.png',
        subtitle: 'Help end poverty.'
      }, 
       {
        title: 'Red Cross',
        icon: 'images/cHexagon.png',
        subtitle: 'Impartial humanitarian organisation'
      },
      {
        title: 'Doctors Without Borders',
        icon: 'images/cHexagon.png',
        subtitle: 'Médecins Sans Frontières'
      },
      {
        title: 'Amnesty International',
        icon: 'images/cHexagon.png',
        subtitle: 'NGO focused on human rights.'
      },
      {
        title: 'NSPCC',
        icon: 'images/cHexagon.png',
        subtitle: 'Every childhood is worth fighting for.'
      },
      ]
    }]
  });
  menu.on('select', function(e) {



    ajax(
      {
        url: 'http://charity.bk.wtf/donation',
        method: "POST",
        type: 'json',
        data: {"charity": e.item.title,
               "lat": LAT,
               "long": LONG,
               "type": "Pebble Smartwatch"
              },
        headers: "Content-Type: application/json"
        
      },

      function(error, status, request) {
        console.log('The ajax request failed: ');
        console.log(JSON.stringify(error));
      },
      function(data, status, request) {
        // Send a long vibration to the user wrist
        Vibe.vibrate('long');
        console.log(e.item.title);
        console.log("The ajax request succeeded.");
        menu.hide();
        main.show();
      }
    );
  });
  menu.show();
});

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

function locationSuccess(pos) {
  LAT = pos.coords.latitude;
  LONG = pos.coords.longitude;
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}


navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);


main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('Information');
  card.body('GeoDonate is an app that lets you register when you donate to a charity. This helps the charities target ad campaigns based on where they perform best.');
  card.show();
});

