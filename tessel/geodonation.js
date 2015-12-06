var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var http = require('http');
var fs = require("fs");

var accelValues = []; //historic acceleration values.
var accelCount = 10; //number of accel values to take an average of
var threshold = 0.10; //difference between y accel and avg y accel.
var timeout = 5000; //timeout between donations.

var lat = 0.0;
var lon = 0.0;
var charity = "Aran's Steezy Charity"; //name of charity being donated to.
var type = "Donation box";

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}



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
  				
  				post();

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


function post() {
	var post_data = '{"charity": "{0}","lat": {1},\
	  			     "long": {2},"type": "{3}"}'.format(charity, lat, lon, type);
    console.log(post_data)

	var post_options = {
	  method : 'POST',
	  host : 'charity.bk.wtf',
	  port : '80',
	  path : '/donation',
	  headers: {
	  	"Content-Type": "application/json",
	  }
	};

	console.log("post() called");
	var post_req = http.request(
		post_options,
		function(res){
			res.setEncoding("utf8");
			res.on("data", function(chunk){
				console.log("Response: "+chunk);
			});
			res.on("error", function(e){
				console.log(e.message);
			});
			res.on("end", function(){
				console.log("Ended")
			});
		});
	post_req.on("error", function(e){
		console.log(e.message);
	})
	post_req.write(post_data);
	post_req.end();
};

