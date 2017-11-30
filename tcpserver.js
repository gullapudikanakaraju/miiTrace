var net = require('net'),
    server = net.createServer();
var stream = require('stream');
var map = new Map();
var request = require('request');

server.listen(5050,'46.101.54.243', () => {
	console.log('Server listening on ', server.address().address, ':', server.address().port);
	
});
function Hex2Bin(n){return parseInt(n,16).toString(2)}
String.prototype.paddingLeft = function (paddingValue) {
   return String(paddingValue + this).slice(-paddingValue.length);
};
dbdata={};

server.on('connection', function (socket) {
	console.log('Connected: ', socket.remoteAddress, ':', socket.remotePort); 
	socket.on('data', function (data) {
		d = data.toString('utf-8');
		arr=[];
			arr=d.split(',');
			console.log(arr);
			// console.log(Hex2Bin(160000));
			bin = Hex2Bin(arr[7]).toString().paddingLeft("000000000000000000000000");
			// console.log(bin);
		if(arr[0]=="!1"){
			map.set(socket.remoteAddress, d.substring(3,18));

		}
		else{
			// console.log(map.get(socket.remoteAddress));
			dbdata = {
				'imei' : map.get(socket.remoteAddress),
				'date' : arr[1],
				'time' : arr[2],
				'latitude' : arr[3],
				'longitude' : arr[4],
				'speed' : arr[5],
				'direction' : arr[6],
				'charging' : bin.substring(1,2),
				'switch_on' : bin.substring(2,3),
				'signal_strength' :bin.substring(3,8),
				'movement' : bin.substring(8,9),
				'motion' : bin.substring(9,10),
				'battery_alarm' : bin.substring(11,12),
				'geofence3' : bin.substring(12,13),
				'geofence2' : bin.substring(13,14),
				'geofence1' :bin.substring(14,15),
				'fall' :bin.substring(15,16),
				'overspeed' :bin.substring(16,17),
				'SOS' : bin.substring(17,18),
				// 'SOS' : 1,

				'working' : bin.substring(20,22),
				'locating': bin.substring(22,24),
				'altitude' : arr[8],
				'battery_level' :arr[9],
				'sattelites_in_use' : arr[10],
				'sattelites_available' :arr[11],
				'created_on' : new Date()

			};
			// console.log(dbdata);
			// extract data
		request.post('http://46.101.54.243:80/devicedata', {form:{msg:dbdata}}, function (error, response, body) {
		  	console.log('error:', error); 
		  	console.log('statusCode:', response && response.statusCode); 
		  	console.log('body:', body); 
		});		
		}
		console.log("Client IP :", socket.remoteAddress, 'Data:', data.toString('utf-8'));
		socket.write('You said: ' + data);
	});
	socket.on('close', function (data) {
		console.log('Closed:', socket.remoteAddress, ' ', socket.remotePort);
	});
	socket.on('error', err => console.log(err));
});

server.on('error', err => console.log(err));
