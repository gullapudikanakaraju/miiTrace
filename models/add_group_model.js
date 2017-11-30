module.exports = function(group_name, request, response){
	var users_data_model = require('../schemas/users_schema.js');
	console.log('in add_group_model.js');
	var temp = {};
	temp.group_name = group_name;
	temp._id = new Date().getTime();
	temp.group_createdOn = new Date();
	users_data_model.update({ _id : request.cookies._id , 'groups.group_name' : {$ne : temp.group_name}}, {$push : {groups : temp}}, function(error, result){
		if(error)
		{
			console.log('some error occurred while pushing the group name into the groups array ',error);
			response.status(200);
			response.render('../views/addgroup.pug', {message : 'Some internal error occur in the server.'});
		}
		else
		{
			if(result.nModified == 0)
			{
				console.log('Group '+ temp.group_name +' already exists ! ', result.nModified)
				response.status(200);
				response.render('../views/addgroup.pug', {message : 'Group "'+ temp.group_name +'" already exists !'});
			}
			else
			{
				console.log('inside else');
				var cookies = request.cookies;
				if(cookies.my_groups == undefined || cookies.my_groups == "")
				{
					console.log('cookie is  not there');
					var t ={};
					t.groups = [];
					t.groups.push({group_name : temp.group_name});
					console.log(t);
					response.cookie('my_groups', JSON.stringify(t));
		
				}
				else
				{
					console.log('cookie is already present ', request.cookies);
					console.log('my_groups ',request.cookies.my_groups);
					var t = JSON.parse(request.cookies.my_groups);
					console.log('t is ',t);
					t.groups.push({group_name : temp.group_name});
					response.cookie('my_groups', JSON.stringify(t));
					console.log('total cookies are ', request.cookies.my_groups);
					console.log('as object ',JSON.parse(request.cookies.my_groups));
				}
				console.log('successfully pushed the group name into the array ', result.nModified);
				response.redirect('/devices');
			}
		}
	});
};