module.exports = function(app){

	app.get('/most_sos', function(request, response){
		console.log('in most_sos_controller.js');
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
			var most_sos_model = require('../models/most_sos_model.js');
			most_sos_model(request, response);
		//}
	});
};