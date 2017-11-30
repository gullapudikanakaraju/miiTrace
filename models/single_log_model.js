module.exports = function(id, request, response){
	var devices_model = require('../schemas/devices_schema.js');
	devices_model.find({owner_id : request.cookies._id}, {imei : 1, _id : 0, member_name : 1, group_name : 1}, function(error, result){
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
			devices_data_model.findOne({_id : id}, function(err, res)
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
						console.log(res);
						var temp = {};
						for(var i=0; i<result.length; i++)
						{
							if(res.imei == result[i].imei)
							{
								 temp.member_name = result[i].member_name;
								 temp.group_name = result[i].group_name;
							}
						}
						response.status(200);
						response.send(JSON.stringify({log : res, data : temp}));
					}
				});
		}
	});
};