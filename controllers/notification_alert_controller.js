module.exports = function(app){
	app.get('/notification_alert', function(request, response){
		console.log('in notification_alert_controller.js');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var notification_alert_model = require('../models/notification_alert_model.js');
			notification_alert_model(request, response);
		}
	});
};