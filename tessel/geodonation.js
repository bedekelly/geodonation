var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

var accelValues = []; //historic acceleration values.
var charity = ""; //name of charity being donated to.
var accelCount = 10; //number of accel values to take an average of
var threshold = 0.10; //difference between y accel and avg y accel.
var timeout = 5000; //timeout between donations.

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Initialize the accelerometer.
accel.on('ready', function () {
    // Stream accelerometer data
  accel.on('data', function (xyz) {
  	accelValues.push(Math.abs(xyz[0]));
  	
  	if(accelValues.length >= accelCount){
  		var avg = 0.0;
  		var value = 0.0;

  		for(var i = 0; i < accelValues.length; i++){
  			avg += accelValues[i];
  		}

  		avg /= accelCount;
  		
  		for(var i = 0; i < accelValues.length; i++){
  			if(Math.abs(parseFloat(accelValues[i]) - avg) > threshold){
  				console.log("Money donated");
  				console.log(Math.abs(parseFloat(accelValues[i]) - avg));
  				sleep(timeout);
  				break;
  			}
  		}

  		accelValues = [];
  	}
  	
    //console.log('x:', xyz[0].toFixed(2),
    // 'y:', xyz[1].toFixed(2),
    // 'z:', xyz[2].toFixed(2));
  });

});

accel.on('error', function(err){
  console.log('Error:', err);
});
