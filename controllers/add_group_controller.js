module.exports = function(app){

	app.get('/addgroup', function(request, response){
		console.log('in add_group_controller.js /addgroup get');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			response.status(200);
			response.render('../views/addgroup.pug');
		}
	});

	app.post('/addgroup', function(request, response){
		var add_group_model = require('../models/add_group_model.js');
		console.log('in add_group_controller.js /addgroup post');
		add_group_model(request.body.name, request, response);
	});
};