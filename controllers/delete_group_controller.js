module.exports = function(app){
	app.get('/delete/:group_name', function(request, response){
		console.log('in delete_group_controller.js');
		console.log('group_name rececived from client is ',request.params.group_name);
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var delete_group_model = require('../models/delete_group_model.js');
			delete_group_model(request.params.group_name, request, response);
		}
	});
};