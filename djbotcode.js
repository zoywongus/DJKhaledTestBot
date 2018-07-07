var botScriptExecutor = require('bot-script').executor;
var scr_config = require('./scr_config.json');
var lsts = ["super","superhuman","demigod","professional","polite","future superstar","amazing","talented",
				"strong","stable","strong-hearted","well-polished","adaptive"];
var booster = lsts[Math.floor((Math.random() * 13))];
const foodprocessdata = {
	"People": {
		"Brandon How Tein Fat":{
								"diet":["diet=high-protein"],
								"excluded":["a"]
							},
		"Finn Macdonald":{
							"diet":["diet=high-protein"],
							"excluded":["a"]
						},
		"Kira Wadden":{
						"diet":["diet=low-fat","Health=vegetarian"],
						"excluded":["steak","beef","pork","sausage"]
					},
		"Ruby Tang":{
						"diet":["diet=low-carb"],
						"excluded":["a"]
					},
		"Sheen Thusoo":{
						"diet":["diet=balanced","Health="],
						"excluded":["a"]
					},
		"Mikal Jamokha":{
							"diet":["diet=high-fibre","Health=alcohol-free"],
							"excluded":["a"]
						},
		"Alexa Wright":{
						"diet":["diet=low-fat"],
						"excluded":["a"]
					},			
		"Julia Kidd":{
						"diet":["diet=balanced"],
						"excluded":["a"]
					},
		"Dan Gregatti":{
						"diet":["diet=balanced"],
						"excluded":["a"]
					},
		"Other": {
					"diet":["diet=balanced"],
					"excluded":["a"]
				}
			},
	"TimesOfDay": {
		"Breakfast": {
			"Foods":["egg","toast","cereal","bagel","croissant","yogurt","oat"],
			"Variables": ["ingr=5","time=20"],
		},
		"Lunch": {
			"Foods":["chicken","sandwich","wrap","burrito","beef","salad","rice","burger",
				"salmon","fish","noodle","quinoa","pork","pasta","jalapeno","skewer","risotto",
				"soup","taco","sausage","bowl"],
			"Variables": ["ingr=6","time=15"],
		},
		"Dinner": {
			"Foods":["chicken","sandwich","wrap","burrito","beef","salad","rice","burger",
				"salmon","fish","noodle","quinoa","pork","pasta","jalapeno","skewer","risotto",
				"soup","taco","sausage","bowl","steak","pizza","stew","cod","lamb","curry"],
			"Variables": ["ingr=8","time=60"],
		},
		"Snack": {
			"Foods":["fruit","cookies","brownies","candy","chips","smoothie","granola"],
			"Variables": ["ingr=5","time=10"],
		}
	}
};
var alcohols = ["red-wine","white-wine","rum","vodka","black","ice","ciroc","beer","alcohol","cold","bourbon","jack",
				"rye","whisky","spirit","champagne","italy","spain","british","french","scotch","xo","bottle","canada",
				"blue","gold","hennessy","drink","Tequila"];

function getdater(utctime) {
	if (utctime <= 3 && utctime >= 0) {
		utctime = 24 - 4 + utctime;
	} else {
		utctime -= 4;
	}
	return utctime;
}


function MessageHandler(context, event) {
	var date = new Date();
	var hour_now = getdater(date.getHours());
	var plistmsg = event.message.toLowerCase().split(" ");
	
	const moviegluheader = {'client': 'ZOY',
				'x-api-key': '36qBGZbm6YBUybj2Nprl9QZkDc0SN543LqN7R8k1', 'api-version': 'v102', 'Geolocation': '43;-79',
				'Authorization': 'Basic Wk9ZOmZib1hraGN3UllkRw=='
			};
	sender = event.senderobj.display;//Obtain the full name of the message sender
    firstName = sender.split(" ",1);//Obtain the first name of the message sender
    var httplink = "";
    var foodindex = 0;
    var dietarys = [];
    if (!(sender in foodprocessdata['People'])) {
		sender = "Other";
	}
    if (foodprocessdata['People'][sender]['diet'].length > 1) {
		dietarys = foodprocessdata['People'][sender]['diet'][0] + "&" + foodprocessdata['People'][sender]['diet'][1];
	} else {
		dietarys = foodprocessdata['People'][sender]['diet'][0];
	}
    var variables = "";
    
	if (event.message.toLowerCase().replace(/\s+/g, '').indexOf('hungry') != -1) {

		if ((hour_now >= 5) && (hour_now <= 9)) {
			foodindex = Math.floor((Math.random()*foodprocessdata['TimesOfDay']['Breakfast']['Foods'].length));
		
			variables = foodprocessdata['TimesOfDay']['Breakfast']['Variables'][0] + "&"
							+ foodprocessdata['TimesOfDay']['Breakfast']['Variables'][1];
			while (foodprocessdata['People'][sender]['excluded'].indexOf(foodprocessdata['TimesOfDay']['Breakfast']['Foods'][foodindex]) > 0) {
				foodindex = Math.floor((Math.random()*foodprocessdata['TimesOfDay']['Breakfast']['Foods'].length));
			}
			
			httplink = "https://api.edamam.com/search?q="+ foodprocessdata['TimesOfDay']['Breakfast']['Foods'][foodindex] 
			+ "&app_id=4e191397&app_key=25821b378d96399281c7f088f69fae96&to=20&" + dietarys + "&" + variables;
			context.simplehttp.makeGet(httplink,null,httpfoodresponder);
			
		} else if ((hour_now >= 11) && (hour_now <= 14)) {
			foodindex = Math.floor((Math.random()*foodprocessdata['TimesOfDay']['Lunch']['Foods'].length));
		
			variables = foodprocessdata['TimesOfDay']['Lunch']['Variables'][0] + "&"
							+ foodprocessdata['TimesOfDay']['Lunch']['Variables'][1];
			while (foodprocessdata['People'][sender]['excluded'].indexOf(foodprocessdata['TimesOfDay']['Lunch']['Foods'][foodindex]) > 0) {
				foodindex = Math.floor((Math.random()*foodprocessdata['TimesOfDay']['Lunch']['Foods'].length));
			}
			httplink = "https://api.edamam.com/search?q="+ foodprocessdata['TimesOfDay']['Lunch']['Foods'][foodindex] 
			+ "&app_id=4e191397&app_key=25821b378d96399281c7f088f69fae96&to=20&" + dietarys + "&" + variables;
			context.simplehttp.makeGet(httplink,null,httpfoodresponder);
	
		} else if ((hour_now >= 16) && (hour_now <= 23)) {
			foodindex = Math.floor((Math.random()*foodprocessdata['TimesOfDay']['Dinner']['Foods'].length));
		
			variables = foodprocessdata['TimesOfDay']['Dinner']['Variables'][0] + "&"
							+ foodprocessdata['TimesOfDay']['Dinner']['Variables'][1];
			while (foodprocessdata['People'][sender]['excluded'].indexOf(foodprocessdata['TimesOfDay']['Dinner']['Foods'][foodindex]) > 0) {
				foodindex = Math.floor((Math.random()*foodprocessdata['TimesOfDay']['Dinner']['Foods'].length));
			}
		
			httplink = "https://api.edamam.com/search?q="+ foodprocessdata['TimesOfDay']['Dinner']['Foods'][foodindex] 
			+ "&app_id=4e191397&app_key=25821b378d96399281c7f088f69fae96&to=20&" + dietarys + "&" + variables;
			context.simplehttp.makeGet(httplink,null,httpfoodresponder);
	
		} else {
			
			foodindex = Math.floor((Math.random()*foodprocessdata['TimesOfDay']['Snack']['Foods'].length));
	
			variables = foodprocessdata['TimesOfDay']['Snack']['Variables'][0] + "&"
							+ foodprocessdata['TimesOfDay']['Snack']['Variables'][1];

			while (foodprocessdata['People'][sender]['excluded'].indexOf(foodprocessdata['TimesOfDay']['Snack']['Foods'][foodindex]) >= 0) {
				foodindex = Math.floor((Math.random()*foodprocessdata['TimesOfDay']['Snack']['Foods'].length));
			}
			
			
			httplink = "https://api.edamam.com/search?q="+ foodprocessdata['TimesOfDay']['Snack']['Foods'][foodindex] 
			+ "&app_id=4e191397&app_key=25821b378d96399281c7f088f69fae96&to=20&" + dietarys + "&" + variables;
			context.simplehttp.makeGet(httplink,null,httpfoodresponder);
	
		} 
	} else if (event.message.toLowerCase().replace(/\s+/g, '').indexOf('thirsty') != -1) {
		var alctype = alcohols[Math.floor(Math.random() * alcohols.length)];
		var httplink = "https://lcboapi.com/products?access_key=MDpkNzgwYWI2YS03MzVjLTExZTgtODdjMC03YjU1NmU4MzFkMzI6dmRsSzB4bmYzeUdNaGYyb29BeFYwdWxvWGFaWjdtdTNHQzk1"
		+ "&per_page=30&q="+ alctype + "&where_not=is_dead,is_discontinued";
		if (event.senderobj.display == "Ruby Tang") {
			httplink += "&order=alcohol_content.asc";
		} else {
			httplink += "&order=alcohol_content.desc";
		}
		context.simplehttp.makeGet(httplink,null,alcoholhandler);
		
	
	} else if (event.message.toLowerCase().replace(/\s+/g, '') == "help") {
		context.sendResponse("------------\nHello, " + firstName + "! You are now officially speaking to DJ Khaled! Help is here! This is what I can do:\n\t'Flip a coin'\n\t'Is stanley a meme god?':\n\tAsk me about movies\n-----------");
	
	} else if ((event.message.toLowerCase().indexOf('business') >= 0) || (event.message.toLowerCase().indexOf('commerce') >= 0)) {
		if (event.message.toLowerCase().indexOf('laurier') >= 0) {
			var image = {"type":"image","originalUrl": "https://media.licdn.com/media-proxy/ext?w=800&h=800&hash=V0o6K%2FpMXamXYjKPxKWxYUZt6jw%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6jnhodx1Ey9KGTqAGj6E5DQJHUA3L0CHH05IbfPWjuKJLZeLWooUARcC0IjQBmfui1ETDlQI61ed_vL95zjp6xJpX5aRUPbhU4hGUB5sE-Pg","previewUrl":"https://media.licdn.com/media-proxy/ext?w=800&h=800&hash=V0o6K%2FpMXamXYjKPxKWxYUZt6jw%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6jnhodx1Ey9KGTqAGj6E5DQJHUA3L0CHH05IbfPWjuKJLZeLWooUARcC0IjQBmfui1ETDlQI61ed_vL95zjp6xJpX5aRUPbhU4hGUB5sE-Pg"};
			var message = ["LAURIER IS THE BEST! RUBY TANG IS IN THE BEST BUSINESS SCHOOL IN CANADA",image];
			context.sendResponse(JSON.stringify(message));
		} else if (event.message.toLowerCase().indexOf('queen') >= 0) {
			var image = {'type':'image','originalUrl':'https://static.timesofisrael.com/www/uploads/2018/03/AP18081316300001-640x400.jpg','previewUrl':'https://static.timesofisrael.com/www/uploads/2018/03/AP18081316300001-640x400.jpg'};
			var message = ['As you can see, the image below is Queens University. Commerce is the black bag fyi.',image];
			context.sendResponse(JSON.stringify(message));
		} else {
			context.sendResponse("Well all other business programs are trash. Laurier is the best!");
		
		} 
	
	} else if (event.message.toLowerCase().indexOf('hottest') > 0) {
		if (event.message.toLowerCase().indexOf('guy') > 0) {
			if (event.senderobj.display == "Ruby Tang") {
				var image = {'type':'image', 'originalUrl': 'https://www.ddsb.ca/school/pineridgess/Students/StudentsOfTheMonth/PublishingImages/mendes.jpg','previewUrl':'https://www.ddsb.ca/school/pineridgess/Students/StudentsOfTheMonth/PublishingImages/mendes.jpg'};
				var message = ['Well of course it is Shawn Mendes OMG OMG' , image];
				context.sendResponse(JSON.stringify(message));
			} else if (event.senderobj.display == "Stanley Wong") {
				var image = {'type':'image', 'originalUrl': 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elm030118cechadwick-001-1517496619.jpg?crop=1xw:1xh;center,top&resize=480:*','previewUrl':'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elm030118cechadwick-001-1517496619.jpg?crop=1xw:1xh;center,top&resize=480:*'};
				var message = ['Well of course it is Chadwick Boseman ;)' , image];
				context.sendResponse(JSON.stringify(message)); 
			} else {
				var image = {'type':'image', 'originalUrl': 'http://i.imgur.com/E1ZLYst.png','previewUrl':'http://i.imgur.com/E1ZLYst.png'};
				var message = ['Hottest guy ever is ME!! DJ KHALED!!!' , image];
				context.sendResponse(JSON.stringify(message));
			}
		} else {
			var image = {'type':'image', 'originalUrl': 'https://img.maximummedia.ie/her_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtaGVyLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE4XFxcLzA1XFxcLzA5MTczNDU0XFxcL2hhaWxleS1iYWxkd2luLXNoYXduLW1lbmRlcy00LTEwMjR4Njg0LmpwZ1wiLFwid2lkdGhcIjo3NjcsXCJoZWlnaHRcIjo0MzEsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5oZXIuaWVcXFwvYXNzZXRzXFxcL2ltYWdlc1xcXC9oZXJcXFwvbm8taW1hZ2UucG5nP3Y9NVwifSIsImhhc2giOiI3M2NkZGQ4ZWQzZWRkOWU4ODBlZTI5Mzk5NjMyZDdjYWMyN2U0YzRkIn0=/hailey-baldwin-shawn-mendes-4-1024x684.jpg','previewUrl':'https://img.maximummedia.ie/her_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtaGVyLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE4XFxcLzA1XFxcLzA5MTczNDU0XFxcL2hhaWxleS1iYWxkd2luLXNoYXduLW1lbmRlcy00LTEwMjR4Njg0LmpwZ1wiLFwid2lkdGhcIjo3NjcsXCJoZWlnaHRcIjo0MzEsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5oZXIuaWVcXFwvYXNzZXRzXFxcL2ltYWdlc1xcXC9oZXJcXFwvbm8taW1hZ2UucG5nP3Y9NVwifSIsImhhc2giOiI3M2NkZGQ4ZWQzZWRkOWU4ODBlZTI5Mzk5NjMyZDdjYWMyN2U0YzRkIn0=/hailey-baldwin-shawn-mendes-4-1024x684.jpg'};
			var message = ['The DJ says that Hailey Baldwin is looking like a SNACK! So hot!' , image];
			context.sendResponse(JSON.stringify(message));
		}
	
	
	} else if ((event.message.toLowerCase().indexOf('bdsm') > 0) || (event.message.toLowerCase().indexOf('relationship') > 0)) {
		var pdf = {'type':'file','url':'http://oz.stern.nyu.edu/startups/nda2.pdf'};
		var message = ['It seems like you want to be in a relationship, you control freak! Looks like you will be needing an NDA!!! ;)',
		pdf];
		context.sendResponse(JSON.stringify(message));
	
	} else if ((event.message.toLowerCase().indexOf("selfie") >= 0) && (event.message.toLowerCase().indexOf("yourself") >=0)) {
		var image = {"type":"image","originalUrl":"http://entertainment.ie//images_content/rectangle/620x372/dj-khaled-you-mine-vid-2015-billboard-650.jpg","previewUrl":"http://entertainment.ie//images_content/rectangle/620x372/dj-khaled-you-mine-vid-2015-billboard-650.jpg"};
		context.sendResponse(JSON.stringify(image));
		
	} else if (event.message.toLowerCase().indexOf("dj") >= 0) {
		context.simplehttp.makeGet('http://api.giphy.com/v1/gifs/random?api_key=64vU8wNKz0GrW1T4Ph0D65HT8VCc4PE9&tag=dj%20khaled&rating=PG-13&fmt=json',null,HttpResponseHandler2);
	
	} else if (event.message.toLowerCase().replace(/\s+/g, '').indexOf("selfie") >= 0) {
		var items = ["djkhaled","homersimpson","justintrudeau"];
		var num = Math.floor(Math.random()*items.length);
		context.simplehttp.makeGet('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bb85164be63cc762a6f97c35e4f4fc76&text='+items[num] + '&format=json&nojsoncallback=1',null,HttpResponseHandler);
		//context.sendResponse('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bb85164be63cc762a6f97c35e4f4fc76&text=' + items[num] + '&format=json&nojsoncallback=1');
		
	} else if (event.message.toLowerCase().replace(/\s+/g, '') == "isstanleyamemegod?") {
		context.sendResponse("Um no. That would be the Python Panther! Sublime Text Forever!");
		
	} else if (event.message.toLowerCase().replace(/\s+/g, '').indexOf("flipacoin") >= 0) {
		var num2 = Math.floor((Math.random()*2));
		if (num2 === 0) {
			var headimg = {"type":"image","originalUrl":"https://images-na.ssl-images-amazon.com/images/I/51xs7F%2BtP5L._SX355_.jpg","previewUrl":"https://images-na.ssl-images-amazon.com/images/I/51xs7F%2BtP5L._SX355_.jpg"};
			context.sendResponse(JSON.stringify(headimg));
		} else {
			var tailimg = {"type":"image","originalUrl":"https://images-na.ssl-images-amazon.com/images/I/51NyMaKLydL.jpg","previewUrl":"https://images-na.ssl-images-amazon.com/images/I/51NyMaKLydL.jpg"};
			context.sendResponse(JSON.stringify(tailimg));
		}
	
	} else if ((plistmsg.indexOf('define') >= 0) || ((plistmsg.indexOf('definition') >= 0) && (plistmsg.indexOf('of') >= 0))) {
		var locate = plistmsg.indexOf('define') + 1;
		if (locate == 0) {
			locate = plistmsg.indexOf('of') + 1;
		}
		header = {'app_id':'47dde701','app_key':'6af0599a8c3980f23ff14eabd607d470'};
		context.simplehttp.makeGet("https://od-api.oxforddictionaries.com/api/v1/entries/en/" + plistmsg[locate],header,WordHandler);
	
	} else if ((plistmsg.indexOf('random') >= 0) && (plistmsg.indexOf('word') >= 0)) {
		var randnum = Math.floor(Math.random()*3);
		var typew = ['verbs','adjecs','nouns'][randnum];
		context.simplehttp.makeGet("https://nlp.fi.muni.cz/projekty/random_word/run.cgi?language_selection=en&word_selection="+typew+"&model_selection=use&length_selection=&probability_selection=true",null,ranwordresp);
		
	
	} else if (plistmsg.indexOf('movies') >= 0 || plistmsg.indexOf('flims') >= 0) {
		if (((plistmsg.indexOf('out') > 0) || plistmsg.indexOf('showing') > 0) && (plistmsg.indexOf('now') > 0 || plistmsg.indexOf('in') > 0)) {
			var locate = plistmsg.indexOf('in') + 1;
			
			if (locate > 0) {
				context.simplehttp.makeGet('https://api.mapbox.com/geocoding/v5/mapbox.places/' + plistmsg[locate] + '.json?country=ca&access_token=pk.eyJ1IjoiZGFtaWFuZHJleGxlciIsImEiOiJjamk0amxiaGkwOXllM3ZtcmtpNHo0cG55In0.aaEd82SZXAj5g76WFmVMjw',null,responsehandler3);
			} else {
				context.simplehttp.makeGet('https://api.mapbox.com/geocoding/v5/mapbox.places/Toronto.json?country=ca&access_token=pk.eyJ1IjoiZGFtaWFuZHJleGxlciIsImEiOiJjamk0amxiaGkwOXllM3ZtcmtpNHo0cG55In0.aaEd82SZXAj5g76WFmVMjw',null,responsehandler3);
								//context.simplehttp.makeGet('https://google.ca',null,responsehandler3);
			}
		
		} else if ((plistmsg.indexOf('coming') < plistmsg.indexOf('soon')) || ((plistmsg.indexOf('coming') < plistmsg.indexOf('out'))))  {
			context.simplehttp.makeGet('https://api-gate.movieglu.com/filmsComingSoon/?n=10',moviegluheader,responsehandlercomingsoon);
		} else {
			context.sendResponse("DJ don't know anything about these other movies");
		}
	
	} else if (plistmsg.indexOf('movie') >= 0) {
		if (plistmsg.indexOf('best') >= 0) {
			context.simplehttp.makeGet('https://api-gate.movieglu.com/filmsNowShowing/?n=10' , moviegluheader,bestmoviehandler);
		} else if ((plistmsg.indexOf('recommend') >= 0) || ((plistmsg.indexOf('should') > 0) && (plistmsg.indexOf('watch') > 0))) {
			context.simplehttp.makeGet('https://api-gate.movieglu.com/filmsNowShowing/?n=25' , moviegluheader,recommendhandler);
		} else {
			context.sendResponse("Nothing");
		}
	} else if (plistmsg.indexOf('weather') >= 0) {
		if (plistmsg.indexOf('now') > 0) {
			var alocate = plistmsg.indexOf('in') + 1;
			var coordinates;
			if (alocate > 0) {
				//context.simplehttp.makeGet('https://api.mapbox.com/geocoding/v5/mapbox.places/vancouver.json?country=ca&access_token=pk.eyJ1IjoiZGFtaWFuZHJleGxlciIsImEiOiJjamk0amxiaGkwOXllM3ZtcmtpNHo0cG55In0.aaEd82SZXAj5g76WFmVMjw',null,coohandler);			
				context.simplehttp.makeGet('https://api.mapbox.com/geocoding/v5/mapbox.places/' + plistmsg[alocate] + '.json?country=ca&access_token=pk.eyJ1IjoiZGFtaWFuZHJleGxlciIsImEiOiJjamk0amxiaGkwOXllM3ZtcmtpNHo0cG55In0.aaEd82SZXAj5g76WFmVMjw',null,coohandler);			
			} else {
				coordinates = [43.6,-79.4];
				context.simplehttp.makeGet('https://api.darksky.net/forecast/b894d07feed31c3ea3de621b009d941e/' + coordinates[0] +','+coordinates[1],null,weatherhandler1);
			}
		} else if (plistmsg.indexOf('tomorrow')>0) {
				context.simplehttp.makeGet('https://api.darksky.net/forecast/b894d07feed31c3ea3de621b009d941e/43.6,-79.4',null,tomorrowhandler);

		} else {
			var imgbern = {"type":"image","originalUrl":"https://media2.giphy.com/media/k4cbiSYeCIvdu/giphy.gif","previewUrl":"https://media2.giphy.com/media/k4cbiSYeCIvdu/giphy.gif"};
			msg = ["DJ says you will feel the bern today!",imgbern];
			context.sendResponse(msg);
		}
	} else if ((event.message.toLowerCase().indexOf('hi') >= 0) || (event.message.toLowerCase().indexOf('hello') >= 0) || (event.message.toLowerCase().indexOf('good morning') >= 0)) {
		var aimg = {"type":"image","originalUrl":"https://media0.giphy.com/media/3o7btYx4Hir9CPJMHe/giphy.gif","previewUrl":"https://media0.giphy.com/media/3o7btYx4Hir9CPJMHe/giphy.gif"};
		var msg = ["Hello beautiful ;)",aimg];
		context.sendResponse(JSON.stringify(msg));
		
	} else {
		var msgtest = "I don't think DJ can help you on that one. Sorry guys.";
		var roomid = 'aY2lzY29zcGFyazovL3VzL1JPT00vOWRmOWJlNjAtNGVkOS0xMWU4LWFmMmItODVkOGIyYWJlYjcx';
		var authorizationthing = "MzkxODA2N2QtNWZiNS00N2JhLWJhYzYtNzg4MzdkYjljODgwYTdlYmJhYWItNDg4";
		var param = "roomId="+ roomid + "&text=" + msgtest;
    	var header = {"Authorization": "Bearer "+ authorizationthing,"Content-Type": "application/x-www-form-urlencoded"};
    	context.simplehttp.makePost("https://api.ciscospark.com/v1/messages",param,header,posthandler);
    	
	}
    
}

function WordHandler(context,event) {
	if (event.getresp.indexOf("404 Not Found") > 0) {
		var imge = {"type":"image","originalUrl":"http://i0.kym-cdn.com/photos/images/newsfeed/000/827/215/c64.gif","previewUrl":"http://i0.kym-cdn.com/photos/images/newsfeed/000/827/215/c64.gif"};
		var message = ["DJ says your word is not DJ enough to be defined!!!",imge];
		context.sendResponse(JSON.stringify(message));
	} else {
		var jsonthing = JSON.parse(event.getresp);
		var str = '`' + jsonthing['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['definitions'][0] + '` - DJ Khaled\nExample of use: ' 
			+ "Hello daddy " + event.senderobj.display + ", you taught be to rap, now I'll teach you to " + jsonthing['results'][0]['id'] + "!   :D";
		context.sendResponse(str);
	}
	
}

function tomorrowhandler(context,event) {
	var jsonthing = JSON.parse(event.getresp);
	var tomorrows = jsonthing['daily']['data'][1];
	var output = "DJ, in partnership with Drake, says tomorrows forcast for Toronto will be too good. It will be "
				+ tomorrows['summary'].toLowerCase() + " Temperature highs will be " + ((tomorrows['temperatureHigh'] - 32)*5/9).toFixed(2)
				+ " degrees. Percent of " + tomorrows['precipType'] + " will be " + (tomorrows['precipProbability'] * 100) + "%. Humidity will be "
				+ (tomorrows["humidity"] * 100) + "%. A good day to jet ski!";
	context.sendResponse(output);
}

function alcoholhandler(context,event) {
	var jsonthing = JSON.parse(event.getresp);
	var count = jsonthing['pager']['current_page_record_count'];
	var drink = jsonthing['result'][Math.floor(Math.random() * count)];
	var output = "DJ is always thirsty. But DJ knows how to cool your thirst! I would reccomend " + drink['name'];
	
	if (drink['producer_name'] != null) {
		output += ". It is produced by " + drink['producer_name'] + ".\n";
	} else {
		output += ".\n";
	}
	if (drink['released_on'] != null) {
		output += "Released on: " + drink['released_on'] + '\n';
	}
	if (drink['package'] != null) {
		output += "Very affordable for you with the cost of $" + drink['price_in_cents']/100 + ", and comes in "
				+ drink['package'] + ", and it is even " + drink['alcohol_content']/100 + "% alcohol content :).";
	} else {
		output += "Very affordable for you with the cost of $" + drink['price_in_cents']/100 
				+ ", and it is even " + drink['alcohol_content']/100 + "% alcohol content :).";
	}
	if (drink['serving_suggestion'] != null) {
		output += "\nSuggestion from DJ: " + drink['serving_suggestion'];
	}
	
	if (drink['image_url'] != null) {
		context.sendResponse(JSON.stringify([output, {"type":"image","originalUrl":drink['image_url'],"previewUrl":drink['image_url']}]));
	} else {
		context.sendResponse(output);
	}
}

function ranwordresp(context, event) {
	context.sendResponse(event.getresp);
}




function weatherhandler1(context, event) {
	var jsonthing = JSON.parse(event.getresp);
	var currenttemp = ((jsonthing.currently.temperature - 32)*(5/9)).toFixed(2).toString();
	var precippercent = ((jsonthing.currently.precipProbability)*100).toString();
	var windspeed = ((jsonthing.currently.windSpeed)*3.6).toFixed(2).toString();
	context.sendResponse("DJ says it's always sunny. But right now it is " + jsonthing.currently.summary + ", and " +
	currenttemp + " degrees outside.\nPercent of precipitation is " + precippercent + "%. DJ Wind Speed says it's " + 
	windspeed + "km/h!!!!\nOtherwise, " + jsonthing['daily']['summary'] +  " Come to LA!!!");
}

function posthandler(context,event) {
	var things = ["Anotha one","Congratulations. You played yourself",
			"I can deal with everything. I got the answer for anything. This DJ Khaled.",
			"The key is to make it.",
			"Give thanks to the most high.",
			"The key to more success is coco butter.",
			"You smart! You loyal! You’re a genius!",
			"They don’t want you to win. They don’t want you to have the No. 1 record in the country. They don’t want you get healthy. They don’t want you to exercise. And they don’t want you to have that view.",
			"Winning, to me, is easy. Winning more is the challenge.",
			"You gotta water your plants. Nobody can water them for you.",
			"“They will try to close the door on you. Just open it.”",
			"Keep all jealous people away from you",
			"The key is to be honest. Be honest, but don’t play yourself",
			"It’s going to work out, stay positive",
			"Hate is a waste of emotion, tell em to jump in the ocean",
			"Be a star. Be a superstar",
			"The other day the grass was brown, now it’s green cuz I ain’t give up. Never surrender",
			"You do know it cost money to put a t-shirt on your back? You do know it cost money to have a house? You do know it cost money to eat? Get money, don’t let these people fool you",
			"When you stop making excuses and you work hard and go hard, you will be very successful",
			"“Key to more success is clean heart and clean face.”",
			"Another one, no. Another two, drop two singles at a time.",
			"God has blessed me because I think. No I know that i’ve been put on this Earth to make people happy, to inspire people and to uplift people. That’s a beautiful thing. But the only downfall about it is that I really don’t have nobody to do that for me. But it makes me super strong because I do know that if I’m having a bad day, I can come up here and make Ebro and y’all laugh and smile",
			"To keep the business going, you gotta keep it boomin",
			"We can take a 'It was hard to get there.' But we ain't taking no loss. We're going to win."
			];
		var test = Math.floor((Math.random() * things.length));
		context.sendResponse(things[test] + "\n--------\n" + firstName + ", type (@DJ) 'help' if you want my help! I'm the one!");
}

function EventHandler(context, event) {
    context.simpledb.roomleveldata = {};
    MessageHandler(context, event);
}


function ScriptHandler(context, event){
    var options = Object.assign({}, scr_config);
    options.current_dir = __dirname;
    //options.default_message = "Sorry Some Error Occurred.";
    // You can add any start point by just mentioning the <script_file_name>.<section_name>
    // options.start_section = "default.main";
    options.success = function(opm){
        context.sendResponse(JSON.stringify(opm));
    };
    options.error = function(err) {
        console.log(err.stack);
        context.sendResponse(options.default_message);
    };
    botScriptExecutor.execute(options, event, context);
}

function coohandler(context,event){
	var jsonthing = JSON.parse(event.getresp);
	var coordinates = [];
	if ((jsonthing.features).length > 0) {
		coordinates[0] = jsonthing.features[0].geometry.coordinates[1];
		coordinates[1] = jsonthing.features[0].geometry.coordinates[0];
	} else {
		coordinates = [43.6,-79.4];
	}
	
	context.simplehttp.makeGet('https://api.darksky.net/forecast/b894d07feed31c3ea3de621b009d941e/' + coordinates[0] +','+coordinates[1],null,weatherhandler1);

}


function responsehandlercomingsoon(context,event) {
	var jsonthing = JSON.parse(event.getresp);
	var str = "DJ sees the future. DJ sees these movies coming out: \n";
	for (var x = 0; x < jsonthing.films.length; ++x){
		str += jsonthing.films[x].film_name + '  ->  Release Date: ' + jsonthing.films[x].release_date + '\n--------\n';
	}
	
	context.sendResponse(str);
}

function responsehandlermovieglu(context,event) {
	var jsonthing = JSON.parse(event.getresp);
	var str = "DJ DJ DJ. These movies out right now: \n";
	for (var x = 0; x < jsonthing.films.length; ++x){
		str += jsonthing.films[x].film_name + '\n';
	}
	
	context.sendResponse(str);
}

function recommendhandler(context,event) {
	var jsonthing = JSON.parse(event.getresp);
	var randnum = Math.floor(Math.random() * Math.min(jsonthing['count'],25));
	var moviedict = jsonthing['films'][randnum]['film_id'];
	context.simplehttp.makeGet("https://api-gate.movieglu.com/filmDetails/?film_id=" + moviedict, {'client': 'ZOY',
				'x-api-key': '36qBGZbm6YBUybj2Nprl9QZkDc0SN543LqN7R8k1', 'api-version': 'v102', 'Geolocation': '43;-79',
				'Authorization': 'Basic Wk9ZOmZib1hraGN3UllkRw=='
			}, movieinfohandler);
}

function movieinfohandler(context,event) {
	var jsonthing = JSON.parse(event.getresp);
	var output = "DJ would say that you must watch " + jsonthing['film_name'] + '; and it is distributed by ' + jsonthing['distributor']
				+ ' and is ' + jsonthing['duration_mins'] + ' minutes long';
	if (jsonthing['cast'].length > 0) {
		output += "\nCast: \n"
		for (item in jsonthing['cast']) {
			output += '     ' + jsonthing['cast'][item]['cast_name'] + '\n';
		}
	}
	context.sendResponse(output);
}

function responsehandler3(context, event) {
	var jsonthing = JSON.parse(event.getresp);
	var coordinates = [];
	if ((jsonthing.features).length > 0) {
		coordinates[0] = jsonthing.features[0].geometry.coordinates[1];
		coordinates[1] = jsonthing.features[0].geometry.coordinates[0];
	}
	if (coordinates.length > 0) {
			//get the stuffs
			context.simplehttp.makeGet('https://api-gate.movieglu.com/filmsNowShowing/?n=10' , {'client': 'ZOY',
				'x-api-key': '36qBGZbm6YBUybj2Nprl9QZkDc0SN543LqN7R8k1', 'api-version': 'v102', 'Geolocation': coordinates[0]+';'+coordinates[1],
					'Authorization': 'Basic Wk9ZOmZib1hraGN3UllkRw=='
			},responsehandlermovieglu);
	} else {
			context.simplehttp.makeGet('https://api-gate.movieglu.com/filmsNowShowing/?n=10' , {'client': 'ZOY',
				'x-api-key': '36qBGZbm6YBUybj2Nprl9QZkDc0SN543LqN7R8k1', 'api-version': 'v102', 'Geolocation': '43;-79',
				'Authorization': 'Basic Wk9ZOmZib1hraGN3UllkRw=='
			},responsehandlermovieglu);
	}
	
}

function HttpResponseHandler2(context, event) {
    var jsonthing = JSON.parse(event.getresp);
    var link = jsonthing.data.image_url;
    var image = {"type":"image","originalUrl":link,"previewUrl":link};
	message = ["Gifbot and Whiz Kid are better than me, " + event.senderobj.display,image];
	context.sendResponse(JSON.stringify(message));
	
}

function bestmoviehandler(context,event) {
	var jsonthing = JSON.parse(event.getresp);
	
	var output = "My favorite movie of all time, which is coincidentally playing right now is: "
				+ jsonthing['films'][0]['film_name'] + " and it's rated " + jsonthing['films'][0]['age_rating']
				+ "\nSynopsis: " + jsonthing['films'][0]['synopsis_long'];
	var link = jsonthing['films'][0]['images']['poster']['1']['medium']['film_image'];
	
	var message = [output,{"type":"image","originalUrl":link,"previewUrl":link}];
	context.sendResponse(JSON.stringify(message));
}

function HttpResponseHandler(context, event) {
	
	var jsonthing = JSON.parse(event.getresp);
    var photodetail = jsonthing.photos.photo[Math.floor(Math.random()*jsonthing.photos.perpage)];
    var link = 'https://farm' + photodetail.farm + '.staticflickr.com/' + photodetail.server + '/' + photodetail.id + '_' + photodetail.secret + '.jpg';
    
    var image = {"type":"image","originalUrl":link,"previewUrl":link};
    message = ["Gifbot and Whiz Kid are better than me, " + event.senderobj.display,image];
	context.sendResponse(JSON.stringify(message));
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function HttpEndpointHandler(context, event) {
    context.sendResponse('This is response from http \n' + JSON.stringify(event, null, '\t'));
}

function LocationHandler(context, event) {
    context.sendResponse("Got location");
}

function httpfoodresponder(context,event) {
	var jsonthing = JSON.parse(event.getresp);
	var recipe_len = Math.min(jsonthing['to'],jsonthing['count']);
	if (recipe_len == 0) {
		context.sendResponse("Suck it up loser");
	}
	var recipe_index = Math.floor((Math.random() * recipe_len));
	var hlthlabel = "";
	var recipe_dict = jsonthing['hits'][recipe_index]['recipe'];
	const numserve = recipe_dict['yield'];
	var recipeliststr = "";
	for (item in recipe_dict['ingredientLines']) {
		recipeliststr += "   - " + recipe_dict['ingredientLines'][item] + "\n";
	}
	if (recipe_dict['dietLabels'].length + recipe_dict['healthLabels'].length > 0) {
		hlthlabel = "  We made sure this meal is:\n";
		if (recipe_dict['dietLabels'].length > 0) {
			for (item in recipe_dict['dietLabels']) {
				hlthlabel += "     - " + recipe_dict['dietLabels'][item] + "\n";
			}
		}
		if (recipe_dict['healthLabels'].length > 0) {
			for (item in recipe_dict['healthLabels']) {
				hlthlabel += "     - " + recipe_dict['healthLabels'][item] + "\n";
			}
		}
		
	}
	if (recipe_dict.cautions.length > 0) {
		hlthlabel += "ATTENTION: Beware of ";
		for (item in recipe_dict['cautions']) {
			hlthlabel += recipe_dict['cautions'][item] + " ";
		}
		hlthlabel += "\n";
	}

	var responsestr = "Hello, helpless hungry " + event.senderobj.display.split(" ",1) + ", here is the recommended DJ " + recipe_dict['label'] + " (by " 
					+ recipe_dict['source'] + ") speciality for you:\n" + hlthlabel + "For a " + booster + " person like you, this meal serves " 
					+ recipe_dict['yield'] + " and yields (per serving):\n   - Calories: " + (Math.ceil(recipe_dict['calories']*100)/100)/numserve + "    ;)\n   - Fat: " 
					+ (recipe_dict['totalNutrients']['FAT']['quantity']/numserve).toFixed(2) + recipe_dict['totalNutrients']['FAT']['unit'] + "    :D\n   - Carbs: " 
					+ (recipe_dict['totalNutrients']['CHOCDF']['quantity']/numserve).toFixed(2) + recipe_dict['totalNutrients']['CHOCDF']['unit'] + "    :)\n   - Protein: "
					+ (recipe_dict['totalNutrients']['PROCNT']['quantity']/numserve).toFixed(2) + recipe_dict['totalNutrients']['PROCNT']['unit'] + " \n   - Sodium: "
					+ (recipe_dict['totalNutrients']['NA']['quantity']/numserve).toFixed(2) + recipe_dict['totalNutrients']['NA']['unit'] + " \n   - Fiber: "
					+ (recipe_dict['totalNutrients']['FIBTG']['quantity']/numserve).toFixed(2) + recipe_dict['totalNutrients']['FIBTG']['unit'] + "\n\n____INGREDIENTS____\n"
					+ recipeliststr + "\n Link to instructions: " + recipe_dict['url'] + "\n-----------Thank me later------------";
	var image = {"type":"image" , "originalUrl":recipe_dict['image'], "previewUrl":recipe_dict['image']};
	const message = [responsestr, image];
	context.sendResponse(JSON.stringify(message));
}

exports.onMessage = MessageHandler;
exports.onEvent = EventHandler;
exports.onHttpResponse = HttpResponseHandler;
exports.onDbGet = DbGetHandler;
exports.onDbPut = DbPutHandler;
if (typeof LocationHandler == 'function') { exports.onLocation = LocationHandler; }
if (typeof HttpEndpointHandler == 'function') { exports.onHttpEndpoint = HttpEndpointHandler; }
