module.exports = function(app){
	app.post('/devicedata', function(request, response){
		console.log('in main_data_controller.js /devicedata');
		console.log('data received from tcpserver is ', request.body.msg);
		var main_data_model = require('../models/main_data_model.js');
		var temp = {
       		imei : request.body.msg.imei,
       		date : request.body.msg.date,
       		time : request.body.msg.time,
       		latitude : request.body.msg.latitude,
       		longitude : request.body.msg.longitude,
       		speed :request.body.msg.speed,
       		direction : request.body.msg.direction,
       		charging : request.body.msg.charging,
       		switch_on : request.body.msg.on,
      		signal_strength : request.body.msg.signal_strength,
      		movement : request.body.msg.movement,
      		motion : request.body.msg.motion,
      		battery_alarm : request.body.msg.battery_alarm,
      		geofence3 : request.body.msg.geofence3,
      		geofence2 : request.body.msg.geofence2,
      		geofence1 :request.body.msg.geofence1,
      		fall :request.body.msg.fall,
      		overspeed :request.body.msg.overspeed,
      		SOS : request.body.msg.SOS,
      		working : request.body.msg.working,
      		locating: request.body.msg.locating,
      		altitude : request.body.msg.altitude,
      		battery_level :request.body.msg.battery_level,
      		sattelites_in_use : request.body.msg.sattelites_in_use,
      		sattelites_available :request.body.msg.sattelites_available,
      		created_on : new Date()
    	};
    	main_data_model(temp, request, response);
	});
};