/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var main = new UI.Card({
  title: 'GeoDonate',
  icon: 'images/hexagon_d.png',
  subtitle: 'Controls: ',
  body: '>> Up - Register a donation. \n >> Down - More info.'});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Charity 1',
        icon: 'images/hexagon_c.png',
        subtitle: 'Charity 1 info'
      }, {
        title: 'Charity 2',
        icon: 'images/hexagon_c.png',
        subtitle: 'Charity 2 info'
      }, {
        title: 'Charity 3',
        icon: 'images/hexagon_c.png',
        subtitle: 'Charity 3 info'
      }, {
        title: 'Charity 4',
        icon: 'images/hexagon_c.png',
        subtitle: 'Charity 4 info',
      }, {
        title: 'Charity 5',
        icon: 'images/hexagon_c.png',
        subtitle: 'Charity 5 info'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('Information');
  card.body('GeoDonate is an app that lets you register when you donate to a charity. This helps the charities target ad campaigns based on where they perform best.');
  card.show();
});

