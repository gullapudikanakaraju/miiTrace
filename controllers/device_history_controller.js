module.exports = function(app){
	app.get('/history', function(request, response){
		console.log('in device_history_controller.js get /history');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var device_history_model = require('../models/device_history_model.js')();
			device_history_model.get_history(request, response);
		}
	});

	app.post('/history', function(request, response){
		console.log('in device_history_controller.js post /history');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var device_history_model = require('../models/device_history_model.js')();
			var data = {};
			data.group_name = request.body.group_name;
			data.imei = request.body.imei;
			var date = request.body.date;
			var temp = [];
			temp = date.split('-');
			data.start_date = temp[0].trim();
			data.end_date = temp[1].trim();
			// response.send(JSON.stringify(data));
			device_history_model.post_history(data, request, response);
		}
	});
};