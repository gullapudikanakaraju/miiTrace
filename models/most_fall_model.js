module.exports = function(request, response){
	var devices_model = require('../schemas/devices_schema.js');
	devices_model.find({owner_id : request.cookies._id}, {imei : 1, _id : 0, member_name : 1},  function(error, result){
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
			console.log('imeis array is ', imeis);
			
			var devices_data_model = require('../schemas/device_data_schema.js');
			devices_data_model.aggregate([{$match : {$and :[{imei : { $in : imeis}}, {fall : '1'}]}}, {$group : {_id : '$imei',  count: { $sum: 1 }}}]).sort({count : -1}).limit(5).exec(function(err, res){
				if(error)
				{
					console.log("some internal error occurred while fetching the required devices ", error);
					response.status(500);
					response.send("Some internal error occurred...\n Please go back and try again later. ");
				}
				else
				{
					console.log('required devices are ', res);
					for(var i=0; i<res.length; i++)
					{

						for(var j=0;j<result.length; j++)
						{
							if(res[i]._id == result[j].imei)
							{
								res[i].member_name = result[j].member_name;
								break;
							}
						}
					}
					// response.write(JSON.stringify(result));
					response.send(JSON.stringify(res)); 
					// response.end();
				}
			});
		}
	});
};