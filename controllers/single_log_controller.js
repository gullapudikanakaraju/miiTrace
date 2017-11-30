module.exports = function(app){

	app.get('/single_log/:id', function(request, response){
		console.log('in single_log_controller.js');
		console.log('id received from the client is ', request.params.id);
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
			var single_log_model = require('../models/single_log_model.js');
			single_log_model(request.params.id, request, response);

		//}
	});
};