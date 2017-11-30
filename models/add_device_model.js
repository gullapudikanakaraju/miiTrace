module.exports = function(){
	return {
		get_group_name : function(request, response){
			var users_data_model = require('../schemas/users_schema.js');
			console.log('in add_device_model.js get_group_name()');
			users_data_model.findOne({_id : request.cookies._id}, function(error, result)
				{
					if(error)
					{
						console.log('some error occurred while fetching the names of the groups ',error);
						response.status(200);
						response.render('../views/adddevice.pug', {message : 'Some internal error occur in the server.'});
					}
					else
					{
						response.status(200);
						console.log('result is ',result.groups);
						response.render('../views/adddevice.pug', {groups : result.groups});
					}
				});
		},

		store_group_details : function(data, request, response){
			console.log(data);
			var users_data_model = require('../schemas/users_schema.js');
			var devices_data_model = require('../schemas/devices_schema.js');
			console.log('in add_device_model.js store_group_details()');
			devices_data_model.find({imei : data.imei}, function(error, result){
				if(error)
				{
					console.log('some error occurred while checking whether a device exists or not ',error);
					response.status(200);
					response.render('../views/adddevice.pug', {message : 'Some internal error occur in the server.'});
				}
				else
				{
					if(result.length == 0)
					{
						devices_data_model.create(data, function(err, output){
							if(err)
							{
								console.log('some error occurred while creating a device ',err);
								response.status(200);
								response.render('../views/adddevice.pug', {message : 'Some internal error occur in the server.'});
							}
							else
							{
								response.status(200);
								console.log(output);
								response.redirect('/groups/'+data.group_name);
							}
						});
					}
					else
					{
						console.log('device with imei "'+ data.imei +'" already exists');
						response.status(200);
						response.render('../views/adddevice.pug', {message : 'device with imei "'+ data.imei +'" already exists', groups : JSON.parse(request.cookies.my_groups).groups});

					}
				}
			});
		}
	}
};