module.exports = function(app){

	app.get('/most_fall', function(request, response){
		console.log('in most_fall_controller.js');
	/*
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
	*/
			var most_fall_model = require('../models/most_fall_model.js');
			most_fall_model(request, response);
		//}
	});
};