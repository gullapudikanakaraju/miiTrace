module.exports = function(request, response){
	console.log('in devices_location_model.js');
	var devices_model = require('../schemas/devices_schema.js');
	devices_model.find({owner_id : request.cookies._id},  {imei : 1, _id : 0}, function(error, result){
		if(error)
		{
			console.log("some error occurred while fetching the imei's of devices corresponding to the owner", error);
			response.status(500);
			response.send('Some internal error occurred...\nPlease go back and try again');
		}
		else
		{
			var imeis = [];
			for(var i in result)
			{
				imeis.push(result[i].imei);
			}
			console.log('result is ', result);
			console.log('imeis array is ', imeis);
			var devices_data_model = require('../schemas/device_data_schema.js');
			devices_data_model.aggregate([
				{ $match : {imei : {$in : imeis}} },
				{ $sort : {imei :1, created_milli : -1} },
				{ $group : 
					{
						_id : '$imei',
						lat : { $first : '$latitude'},
						long : { $first : '$longitude'}
				    } 
				}
			], function(err, res){
				if(err)
				{
					console.log('error occurred while fetching the latitudes and longitudes of required devices', error);
					response.status(500);
					response.send('Some internal error occurred...\nPlease go back and try again');
				}
				else
				{
					console.log('successfully fetched the data ', res);
					response.status(200);
					response.send(res);
				}
			});
		}
	});
};