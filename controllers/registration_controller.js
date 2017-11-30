module.exports = function(app){
   
    var registration_model = require('../models/registration_model.js');
    app.get('/signup', function(request, response){
        console.log('in registration_controller.js /signup get');
    	var cookies = request.cookies;
    	if(cookies._id == null || cookies._id == "")
    	{
    		response.status(200);
    		response.render('../views/signup.pug');
    	}
    	else
    	{
    		response.redirect('/devices');
    	}
    });

    app.post('/signup', function(request, response){
        console.log('in registration_controller.js /signup post');
    	var data = {};
    	data.email = request.body.email;
    	data.user_name = request.body.username;
    	data.mobile = request.body.contact;
    	data.password = request.body.password;
        data.joined_on = new Date();
    	if(data.password != request.body.confirmpassword)
    	{
    		response.render('../views/signup.pug', { message : 'Passwords do not match.'});
    	}
    	else
    	{
    		registration_model(data, request, response);
    	}
    });
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               