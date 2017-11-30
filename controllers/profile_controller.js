module.exports = function(app){
	app.get('/edit_profile', function(request, response){
		console.log('in profile_controller.js  /edit_profile get');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var profile_model = require('../models/profile_model.js')();
			profile_model.edit_profile_get(request, response);
		}
	});

	app.post('/edit_profile', function(request, response){
		console.log('in profile_controller.js /edit_profile post');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var profile_model = require('../models/profile_model.js')();
			console.log('data received from client is ', request.body);
			var data = {};
			data.actual_user_name = request.body.actual_user_name.trim();
			data.user_name = request.body.user_name.trim();
			data.mobile = request.body.mobile.trim();
			profile_model.edit_profile_post(request.body.email, data, request, response);
		}
	});
};