module.exports = function(data, request, response){
	console.log('in main_data_model.js');
	var devices_data_model = require('../schemas/device_data_schema.js');
	devices_data_model.create(data, function(error, result){
		if(error)
		{
			console.log('some error occurred while saving the data received fromt the tcpserver', error);
			response.status(500);
			response.send(error, result);
		}
		else
		{
			console.log('successfully saved the data that is received from the tcpserver', result);
			response.status(200);
			response.send(null, result);
		}
	}); 
};