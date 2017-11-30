module.exports = function(group_name, request, response){
	var devices_data_model = require('../schemas/devices_schema.js');
	devices_data_model.find({owner_id : request.cookies._id, group_name : group_name}).remove(function(error, result){
		if(error)
		{
			console.log('some error occurred while deleting devices corressponding to the group ', error);
			response.status(500);
			response.send('Some error occurred while deleting a group... \nPlease try again later');
		}
		else
		{
			console.log('successfully deleted the devices corresponding to the group ');
			var users_data_model = require('../schemas/users_schema.js');
			users_data_model.update({_id : request.cookies._id}, {$pull : {groups : { group_name : group_name}}}, function(err, res){
				if(err)
				{
					console.log('some error occurred while deleting a group ', err);
					response.status(500);
					response.send('Some error occurred while deleting a group... \nPlease try again later');
				}
				else
				{
					var x = JSON.parse(request.cookies.my_groups).groups;
					for(var i=0; i<x.length; i++)
					{	
						if(x[i].group_name == group_name)
						x.splice(i,1);
					}
					var temp = {groups: x};
					console.log('successfully deleted the group ');
					response.cookie('my_groups', JSON.stringify(temp));
					response.status(200);
					response.redirect('/devices');
				}
			});
		}
	});
};
