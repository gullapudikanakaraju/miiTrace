# miiTrace
A dashboard for a device which is used to track a old person. 
There are two servers i.e. one is tcp server which receives data from the device and the other is http server which responds to requests coming for the dashboard.
The device sends data to the tcp server after every 50 seconds after it gets connected to the tcp server. The tcp server then makes an http request to the http server to store the data in the database.
The device has various features like SOS alaram, alaram for fall, overspeed alarm etc.
It sends the location i.e. latitudes and longitudes of the old person.
