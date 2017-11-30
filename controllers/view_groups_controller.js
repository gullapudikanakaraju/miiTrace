module.exports = function(app)
{
	app.get('/groups/:group_name', function(request, response){
		console.log('in view_groups_controller.js');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var view_groups_model = require('../models/view_groups_model.js');
			view_groups_model(request.params.group_name, request, response);
		}
	});
};