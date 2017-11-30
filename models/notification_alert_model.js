module.exports = function(request, response){
	console.log('in notification_alert_model.js');
	var devices_model = require('../schemas/devices_schema.js');
	devices_model.find({owner_id : request.cookies._id}, {imei : 1, _id : 0, member_name : 1}, function(error, result){
		if(error)
		{
			console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
			response.status(500);
			response.send("Some internal error occurred...\n Please go back and try again later. ");
		}
		else
		{
			var imeis = [];
			for(var i in result)
			{
				imeis.push(result[i].imei);
			}
			console.log('result is ', result);
			// console.log('imeis array is ', imeis);
			var devices_data_model = require('../schemas/device_data_schema.js');
			devices_data_model.find({$and : [{imei : {$in : imeis}}, {$or : [{SOS : '1'}, {fall : '1'}, {battery_alarm : '1'}]}]}).sort({created_milli : -1}).exec(function(err, res)
				{
					if(err)
					{
						console.log("some internal error occurred while fetching required devices ", err);
						response.status(500);
						response.send("Some internal error occurred...\n Please go back and try again later. ");
					}
					else
					{
						console.log('success');
						console.log(result.length);
						console.log(res.length);
					    for(i in res)
						{
							for(j in result)
							{
								if(res[i].imei == result[j].imei)
								{
									res[i].member = result[j].member_name;
									console.log(res[i].member);
									break;
								}
							}
						}
						response.status(200);
						response.send(JSON.stringify(res));
					}
				});
		}
	});
};