module.exports = function(group_name, imei, request, response){
	var devices_data_model = require('../schemas/devices_schema.js');
	devices_data_model.find({imei : imei}).remove(function(error, result){
		if(error)
		{
			console.log('some error occurred while deleting a device ', error);
			response.status(500);
			response.send('Some error occurred while deleting a device... \nPlease try again later');
		}
		else
		{
			console.log('successfully deleted the device ');
			response.status(200);
			response.redirect('/groups/'+group_name);
		}
	});
};