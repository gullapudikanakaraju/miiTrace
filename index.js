var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var validator = require('express-validator');
var multer = require('multer');
var bcrypt = require('bcryptjs');
var async = require('async');
var upload = multer({ dest: './public/uploads' });

var app = express();
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

// to handle registration
require('./controllers/registration_controller.js')(app);

// to handle login, logout
require('./controllers/basic_controllers.js')(app, upload);

// to handle /devices get request
require('./controllers/devices_controller.js')(app);

// to add groups
require('./controllers/add_group_controller.js')(app);

// to add devices
require('./controllers/add_device_controller.js')(app);

// to view all the devices in a particular group
require('./controllers/view_groups_controller.js')(app);

// to delete a device
require('./controllers/delete_device_controller.js')(app);

// to delete a group
require('./controllers/delete_group_controller.js')(app);

// to edit the details of a device
require('./controllers/edit_device_controller.js')(app);

// to get top 5 sos
require('./controllers/most_sos_controller.js')(app);

// to get top 5 falls
require('./controllers/most_fall_controller.js')(app);

// to get device history
require('./controllers/device_history_controller.js')(app);

// to get notifications of SOS alarm, Fall alaram, Low Battery alaram
require('./controllers/notification_alert_controller.js')(app);

// to get details of a single log
require('./controllers/single_log_controller.js')(app);

// to update the profile
require('./controllers/profile_controller.js')(app);


require('./controllers/main_data_controller.js')(app);
app.set('port', 8080);
app.listen(app.get('port'), function(error){
	if(error)
		console.log('error occurred while trying to listen on port number ', app.get('port'));
	else
		console.log('server listening on port number ', app.get('port'));
});