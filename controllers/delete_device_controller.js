module.exports = function(app){
	app.get('/:group_name/delete/:imei', function(request, response){
		console.log('in delete_device_controller.js');
		console.log('imei rececived from client is ',request.params.imei);
		console.log('group_name rececived from client is ',request.params.group_name);
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var delete_device_model = require('../models/delete_device_model.js');
			delete_device_model(request.params.group_name, request.params.imei, request, response);
		}
	});
};