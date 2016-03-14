var express = require('express');
var io = require('socket.io');
var request = require('request');
var cheerio = require('cheerio');
var CronJob = require('cron').CronJob;

var guildSpy = express();

// Global variables
var onlinePeople = 0;
var onlineCheckers = 0;

// Serve static content
guildSpy.use(express.static('public'));

// Mappings
guildSpy.get('/', function(req, res) {
	res.sendFile(__dirname + '/' + 'index.htm');
});

var scraper = function() {
	
	// TODO: At some point in time we could make this configurable
	var url = 'https://secure.tibia.com/community/?subtopic=guilds&page=view&onlyshowonline=1&GuildName=Cause';
	
	console.log('Requesting data');
	
	request(url, function(error, response, html) {
	    if(!error){
	        var $ = cheerio.load(html);
		    
	        console.log('Fetching data');
	        
		    var onlineCheck = 0;
		    
		    $('td.onlinestatus')
		    	.each(function() {
		    		onlineCheck++;
		    	});
		    
		    if (onlineCheck > onlinePeople)
		    {
		    	var warning = {warning: 'S'};
		    	ioGS.emit('warning', warning);
		    }
		    
		    onlinePeople = onlineCheck;
		    
		    console.log('Data fetched');
		    console.log('Theres ' + onlinePeople + ' connected enemies.');
	    }
	});
};

// Server configuration
//process.env.PORT lets the port be set by Heroku
guildSpy.set('port', (process.env.PORT || 8080));

var server = guildSpy.listen(guildSpy.get('port'), function() {

	console.log("GuildSpy listening at http://localhost:%s", port);
	console.log("Starting CronJob");
	
	var job = new CronJob({
		  cronTime: '*/10 * * * * *',
		  onTick: scraper,
		  start: false,
		  timeZone: 'Europe/Madrid'
		});
	job.start();
	
	console.log("CronJob started");
});

//Socket.IO configuration
var ioGS = io.listen(server);
ioGS.on('connection', function(socket) {
	
	onlineCheckers++;
	console.log('User connected');
	console.log('Theres ' + onlineCheckers + ' connected');
	
	socket.on('disconnect', function() {
		onlineCheckers--;
		console.log('User disconneccted');
		console.log('Theres ' + onlineCheckers + ' connected');
	});
});
