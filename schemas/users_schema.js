var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var con = mongoose.createConnection('mongodb://localhost:27017/miitrace_db');
var users_schema = new Schema({
	_id :{
		type : Number,
		required : true,
		trim : true,
		unique : true
	},
	email :{
		type : String,
		required : true,
		unique : true,
		trim : true
	},
	user_name :{
		type : String,
		required : true,
		unique : true,
		trim : true
	},
	mobile :{
		type : Number,
		required : true,
		trim : true
	},
	password :{
		type : String,
		required : true,
		trim : true
	},
	profile_pic_url :{
		type : String,
		trim : true,
		default : ''
	},
	groups :{
			type : [{
	    	_id :{
				type : Number,
				required : true,
				trim : true,
				unique : true
			},
			group_name :{
				type : String,
				required : true,
				trim : true
			},
			group_createdOn :{
				type : Date,
				required : true,
				trim : true
			}
		}],
		default : []
	},
	joined_on :{
		type : String,
		required : true,
		trim : true
	}
}); 

con.on('error',function(error){
	console.log("error occurred while connecting to the database "+error);
});

con.once('open',function(){
	console.log("connected to the database successfully !");
});

var users_model = con.model('user', users_schema);
module.exports = users_model;