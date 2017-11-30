module.exports = function(){
	return {
		login_check : function(data, request, response){
			var users_data_model = require('../schemas/users_schema.js');
			var bcrypt = require('bcryptjs');
			console.log('in basic_models.js');
			console.log('data received from basic_controller.js is ',data);
 
		    users_data_model.find().where('user_name').equals(data.user_name).exec(function(error, result){
    			if(error)
    			{	
    				console.log("error occurred while checking for the presence of username ", error);
    				response.status(500);
    				response.render('../views/login.pug', {message : 'Some internal error occur in the server.'})
    			}
    			else
    			{
    				if(result.length == 0)
    				{
    					console.log('No user found ');
    					response.status(200);
    					response.render('../views/login.pug', { message : 'No user found.'});
    				}
    				else
    				{
    					bcrypt.compare(data.password, result[0].password, function(error, output){
    					if(error)
    					{
    						console.log("error occurred while comparing the hashed password and password entered by the user ", error);
    						response.status(500);
    						response.render('../views/login.pug', { message : 'Some internal error occur in the server.'})
    					}
    					else
    					{
    						if(output == true)
    						{
    							response.cookie('_id', result[0]._id);
    							response.cookie('email', result[0].email);
                                response.cookie('profile_pic_url', result[0].profile_pic_url);
                                response.cookie('user_name',  result[0].user_name);
                                if(result[0].groups.length !=0)
                                {
                                    response.cookie('my_groups', JSON.stringify({groups : result[0].groups}));
                                }
                    
    							response.status(200);
    							console.log('logged in successfully');
    							response.redirect('/devices');
    						}
    						else
    						{
    							response.status(200);
    							response.render('../views/login.pug', { message : 'Oops! Wrong password.'})
    						}
    					}
    					});
    				}
    			}
    		});
		},

		upload_profile_pic : function(url, request, response){
			console.log('url of file received from basic_controller.js is ', url);
			var users_data_model = require('../schemas/users_schema.js');

			users_data_model.update({_id : request.cookies._id}, {$set : {profile_pic_url : url}}, function(error, result){
				if(error)
				{
					console.log('error occurred while saving the profile pic url in the database ', error);
					response.status(500);
					response.render('../views/upload.pug', { message : 'Some internal error occur in the server.'})
				}
				else
				{
					console.log(result);
                    response.cookie('profile_pic_url', url);
					response.redirect('/devices');
				}
			});
		},

        get_my_profile : function(request, response){
            console.log('in get_my_profile() function');
            var users_data_model = require('../schemas/users_schema.js');
            users_data_model.findOne({_id : request.cookies._id}, function(error, result){
                if(error){
                    console.log('some eror occurred while fetching the profile info');
                    response.status(500);
                    response.send('some eror occurred while fetching the profile info\nPlease go back and try again later');
                }
                else
                {
                    response.status(200);
                    console.log('successfully fetched the profile info ', result);
                    response.render('profile.pug',{ groups : result.groups, pic : result.profile_pic_url, user : result});
                }
            });
        }
	}
};
