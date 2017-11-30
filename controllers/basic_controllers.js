module.exports = function(app, upload){

	app.get('/', function(request, response){
		console.log('in basic_controller.js for /login get method');
		var cookies = request.cookies;
		if(cookies._id == null || cookies._id == "")
		{
			response.status(200);
			response.render('../views/login.pug');			
		}
		else
		{
			response.redirect('/devices');
		}
	});



	app.post('/', function(request, response){
		var basic_models = require('../models/basic_models.js')();
		var data = {};
		data.user_name = request.body.username;
		data.password = request.body.password;
		console.log('in basic_controller.js for /login post method');
		console.log(data);
		basic_models.login_check(data, request, response);
	});



	app.get('/upload', function(request, response){
		var cookies = request.cookies;
		if(cookies._id == null || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			response.status(200);
			response.render('../views/upload.pug');
		}
	});


	app.post('/upload', upload.single('avatar'), function(request, response){
		var basic_models = require('../models/basic_models.js')();
		console.log('file information is ', request.file);
		var url = '/uploads/'+request.file.filename;
		basic_models.upload_profile_pic(url, request, response);
	});

	app.get('/logout', function(request, response){
		console.log('in basic_controller.js /logout');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.redirect('/');
		}
		else
		{
			response.clearCookie('_id');
			response.clearCookie('email');
			response.clearCookie('my_groups');
			response.clearCookie('user_name');
			response.clearCookie('profile_pic_url');
	    	response.status(200);
	    	response.redirect('/');
		}
	});


	app.get('/profile', function(request, response){
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.redirect('/');
		}
		else
		{
			var basic_models = require('../models/basic_models.js')();
			basic_models.get_my_profile(request, response);
		}
	});
};