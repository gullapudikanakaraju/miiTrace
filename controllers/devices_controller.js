module.exports = function(app){
	app.get('/devices', function(request,response){
		console.log('in devices_controller.js /devices');
		var cookies = request.cookies;
		if(cookies._id == null || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var devices_model = require('../models/devices_model.js')();
			if(request.query.date == null || request.query.date == "")
			{
				console.log('cookies are ', cookies);
				devices_model.get_device_data(request, response);
			}
			else
			{
				var temp = require.query.date.split('-');
				var start_date = temp[0].trim();
				var end_date = temp[1].trim();
				console.log('start date is ', start_date);
				console.log('end date is ', end_date);
				devices_model.get_device_data(request, response, start_date, end_date);
			}
		}
	});

	app.get('/devices/location', function(request, response){
		console.log('in devices_controller.js /devices/location');
		var cookies = request.cookies;
		if(cookies._id == null || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var devices_model = require('../models/devices_model.js')();
			devices_model.get_device_recent_location(request, response);
		}
	});
};