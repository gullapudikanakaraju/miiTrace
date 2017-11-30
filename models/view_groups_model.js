module.exports = function(group_name, request, response){
	var devices_data_model = require('../schemas/devices_schema.js');
	devices_data_model.find({owner_id : request.cookies._id, group_name : group_name}, function(error, result){
		if(error)
		{
			response.status(500);
			console.log('some error occurred while fetching the devices in a group ',error);
			response.send('some error occurred while fetching the devices in a group');
		}
		else
		{
			response.status(200);
			console.log('success ', result);
			console.log('length is ', result.length);
			if(result.length != 0)
			{
				console.log('inside if');
				console.log('result is ', result);
				// response.setHeader('content-type', 'application/json');
				// response.write(JSON.stringify({groups : JSON.parse(request.cookies.my_groups).groups}));
				// response.write(JSON.stringify({pic : request.cookies.profile_pic_url}));
				// response.write(JSON.stringify({devices : result}));
				response.render('viewdevices.pug', {groups : JSON.parse(request.cookies.my_groups).groups, pic : request.cookies.profile_pic_url, devices : result, user_name : request.cookies.user_name});
			}
			else
			{
				console.log('inside else');
				response.render('viewdevices.pug', {groups : JSON.parse(request.cookies.my_groups).groups, pic : request.cookies.profile_pic_url, message:"You do not have any devices in this group yet!!"});				
			}
		}
	});
};