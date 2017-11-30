var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var con = mongoose.createConnection('mongodb://localhost:27017/miitrace_db');
var device_data_schema = new Schema({
	imei :{
	 	type : String,
	 	required : true,
	 	trim : true
	},
    date :{
        type : String,
        required : true,
	 	trim : true
    },
    time :{
    	type : String,
    	required : true,
	 	trim : true
  	},
    latitude :{
     	type : String,
     	required : true,
	 	trim : true
    },
    longitude :{
    	type : String,
    	required : true,
	 	trim : true
    },
    speed :{
     	type : String,
     	required : true,
	 	trim : true
    },
    direction :{
    	type : String,
    	required : true,
	 	trim : true
    },
    charging :{
    	type : String,
    	required : true,
	 	trim : true
    },
    switch_on :{
        type : String,
        trim : true
    },
    signal_strength :{
    	type : String,
    	required : true,
	 	trim : true
    },
    movement :{
    	type : String,
    	required : true,
	 	trim : true
    },
    motion :{
    	type : String,
    	required : true,
	 	trim : true
    },
    battery_alarm :{
    	type : String,
    	required : true,
	 	trim : true
    },
    geofence3 : {
    	type : String,
    	required : true,
	 	trim : true
    },
    geofence2 :{
     	type : String,
     	required : true,
	 	trim : true
    },
    geofence1 :{
    	type : String,
    	required : true,
	 	trim : true
    },
    fall :{
    	type : String,
    	required : true,
	 	trim : true
    },
    overspeed :{
    	type : String,
    	required : true,
	 	trim : true
    },
    SOS :{
    	type : String,
    	required : true,
	 	trim : true
    },
    working :{
    	type : String,
    	required : true,
	 	trim : true
    },
    locating :{
    	type : String,
    	required : true,
	 	trim : true
    },
    altitude :{
    	type : String,
    	required : true,
	 	trim : true
    },
    battery_level :{
    	type : String,
    	required : true,
	 	trim : true
    },
    sattelites_in_use :{
    	type : String,
    	required : true,
	 	trim : true
    },
    sattelites_available :{
    	type : String,
    	required : true,
	 	trim : true
    },
    created_on :{
    	type : String,
    	required : true,
	 	trim : true
    },
    created_milli :{
        type : Number,
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

var device_data_model = con.model('device_data', device_data_schema);
module.exports = device_data_model;