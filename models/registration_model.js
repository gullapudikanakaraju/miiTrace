module.exports = function(data, request, response){

	var users_data_model = require('../schemas/users_schema.js');
	var bcrypt = require('bcryptjs');
	console.log('in registration_model.js');
	console.log('data received from registration_controller.js is ',data);

    users_data_model.find({$or : [{email : data.email}, {user_name : data.user_name}]}, function(error, result){
    	if(error)
		{
			console.log('error occurred while checking for the existence of email in users database '+error);
			response.status(500);
			response.render('../views/signup.pug', { message : 'Some internal error occur in the server.'});
		}
		else
		{
			if(result.length != 0)
			{
				for(var i=0; i<result.length; i++)
				{
					if(result[i].email === data.email)
					{
						console.log('the email is already registered ', result);
						response.status(200);
						response.render('../views/signup.pug', { message : 'The email is already registered.'});
					}
					if(result[i].user_name === data.user_name)
					{
						console.log('the username is already used ', result);
						response.status(200);
						response.render('../views/signup.pug', { message : 'The username is already used.'});
					}
				}

			}
			else
			{
				bcrypt.hash(data.password, 10, function(err, hash){
					if(err)
					{
						console.log('error occurred while hashing the password ', err);
						response.status(500);
						response.render('../views/signup.pug', { message : 'Some internal error occur in the server.'});
					}
					else
					{
						data.password = hash;
						console.log('hashed password is ', data.password);
						data._id= new Date().getTime();
						users_data_model.create(data, function(error, result){
							if(error)
							{
								console.log('error occurred while creating a document in users database ',error);
								response.status(500);
								response.render('../views/signup.pug', { message : 'Some internal error occur in the server.'});
							}
							else
							{
								console.log('registration completed successfully ', result);
								response.cookie('_id', data._id);
								response.cookie('email', data.email);
								response.cookie('user_name', data.user_name);
								response.redirect('/upload');
							}
						});
					}
				});
			}
		}
    });
};