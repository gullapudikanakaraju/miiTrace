module.exports = function(app){

	app.get('/adddevice', function(request, response){
		console.log('in  add_device_controller.js /adddevice get');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			if(cookies.my_groups == undefined || cookies.my_groups == "")
			{
				response.status(403);
				response.send('You didnot add any group so you can not add a device...\nPlease go back and add a group and then try again !');
			}
			else
			{
				var add_device_model = require('../models/add_device_model.js')();
				add_device_model.get_group_name(request, response);
			}
		}
	});

	app.post('/adddevice', function(request, response){
		console.log('in  add_device_controller.js /adddevice post');
		var data = {};
		data._id = new Date().getTime();
		data.group_name = request.body.group;
		data.owner_id = request.cookies._id;
		data.imei = request.body.imei;
		data.member_name = request.body.user_name;
		data.dob = request.body.DOB;
		data.age = request.body.age;
		data.contact_number = request.body.contact_number;
		data.emergency_contact_number = request.body.emergency_contact;
		data.additional_details = request.body.additional_details;
		data.added_on = new Date();
		data.added_milli = new Date().getTime();
		var add_device_model = require('../models/add_device_model.js')();
		add_device_model.store_group_details(data, request, response);
	});
};