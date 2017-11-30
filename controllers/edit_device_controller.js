module.exports = function(app){
	app.get('/editDevice/:imei', function(request, response){
		console.log('in edit_device_controller.js get method');
		console.log('imei rececived from client is ',request.params.imei);
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var edit_device_model = require('../models/edit_device_model.js')();
			edit_device_model.edit_device_get(request.params.imei, request, response);
		}
	});

	app.post('/editDevice/:imei', function(request, response){
		console.log('in edit_device_controller.js post method');
		console.log('imei rececived from client is ',request.params.imei);
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			console.log('data rececived from client is ', request.body);
			var edit_device_model = require('../models/edit_device_model.js')();
			edit_device_model.edit_device_post(request.body, request, response);
		}
	});
};