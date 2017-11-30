module.exports = function(){
	return {
		get_history : function(request, response){
			console.log('in device_history_model.js');
			var async = require('async');
			var devices_model = require('../schemas/devices_schema.js');
			var devices_data_model = require('../schemas/device_data_schema.js');
			var users_data_model = require('../schemas/users_schema.js');
			async.parallel({
				groups_imeis_data : function(callback){
				devices_model.find({owner_id : request.cookies._id},{imei : 1, group_name : 1, _id : 0}, callback);
				},
				group_names : function(callback){
				users_data_model.findOne({_id : request.cookies._id}, {groups : 1, _id : 0}, callback);
				}
			}, function(error, result){
				if(error)
				{
					console.log('error occurred while fetching the history of devices ', error);
					response.status(500);
					response.send('Some internal error occurred...\nPlease go back and try again later...');
				}
				else
				{
					console.log('success');
					console.log('groups_imeis_data is ', result.groups_imeis_data);
					console.log('group_names are ', result.group_names);
					var temp = [];
					for(var i=0; i<result.group_names.groups.length; i++)
					{
						var x = {};
						x.group_name = result.group_names.groups[i].group_name;
						x.imeis = [];
						temp.push(x);
					}
					console.log('temp is ', temp);
					var imeis = [];
					for(var i=0; i<result.groups_imeis_data.length; i++)
					{
						imeis.push(result.groups_imeis_data[i].imei);
						for(var j=0; j<temp.length; j++)
						{
							if(result.groups_imeis_data[i].group_name == temp[j].group_name)
							{
								temp[j].imeis.push(result.groups_imeis_data[i].imei);
								break;
							}
						}
					}
					console.log('imeis array is ', imeis);
					console.log('new temp is ', temp);
					devices_data_model.find({imei : {$in : imeis}}, function(e, r){
						if(error)
						{
							console.log('some internal error occurred while fetching the logs ', error);
							response.status(500);
							response.send('Some internal error occurred...\nPlease go back and try again later.');
						}
						else
						{
							//console.log('successfully fetched the logs ', result);
							response.status(200);
							response.send(JSON.stringify({ device_data : r, data_for_filters : temp}));
							// response.send('success');
							//console.log(JSON.parse(request.cookies.my_groups).groups);
							//return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url, data : result });
						}
					});
				}
			});
		},

		post_history : function(data, request, response){
			console.log('in device_history_model post_history method');
			console.log('data received from the controller is ',data);
			var devices_data_model = require('../schemas/device_data_schema.js');
			var moment = require('moment');
			var start_date=moment(data.start_date).format('DD/MM/YYYY');
            var end_date=moment(data.end_date).format('DD/MM/YYYY');
            console.log('in model start_date is ', start_date);
			devices_data_model.find({imei : data.imei, date : {$gte : start_date, $lte : end_date}}, function(error, result){
				if(error)
				{
					console.log('some internal error occurred while fetching the logs ', error);
					response.status(500);
				    response.send('Some internal error occurred...\nPlease go back and try again later.');
				}
				else
				{
					console.log('successfully fetched the logs of the devices ', result);
					response.status(200);
					response.send(JSON.stringify(result));
				}
			});
		}
	};
};


