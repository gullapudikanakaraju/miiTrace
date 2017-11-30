var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var con = mongoose.createConnection('mongodb://localhost:27017/miitrace_db');
var devices_schema = new Schema({
	_id :{
		type : Number,
		required : true,
		trim : true,
	},
	imei :{
		type : String,
		unique : true,
		required : true,
		trim : true
	},
	member_name :{
		type : String,
		required : true,
		trim : true
	},
	group_name :{
		type : String,
		required : true,
		trim : true
	},
	owner_id :{
		type : Number,
		required : true,
		trim : true,
	},
	dob :{
		type : String,
		required : true,
		trim : true
	},
	age :{
		type : Number,
		required : true,
		trim : true
	},
	contact_number :{
		type : Number,
		required : true,
		trim : true
	},
	emergency_contact_number :{
		type : Number,
		required : true,
		trim : true
	},
	added_on :{
		type : String,
		trim : true,
		required : true
	},
	added_milli :{
		type : Number,
		trim : true,
		required : true
	},
	additional_details :{
		type : String,
		trim : true,
		default : ''
	}
}); 

con.on('error',function(error){
	console.log("error occurred while connecting to the database "+error);
});

con.once('open',function(){
	console.log("connected to the database successfully !");
});

var devices_model = con.model('device', devices_schema);
module.exports = devices_model;