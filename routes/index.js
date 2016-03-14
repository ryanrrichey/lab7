var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
router.use(express.static('public'));
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req);
  res.sendFile('weather.html', { root:  'public' });
});

// router.get('/quotes', function(req, res, next) {
// 	var userData = "";
// 	res.status(200).json(quotes);
// });


router.get('/getgithub',function(req,res,next)
{
	var username = req.query.username;
	var githubjunk = [];
	console.log("in getgit");
	var options = {
		url: "https://api.github.com/users/"+username,
		headers: {
			'User-Agent': 'request'
		}
	}
	request(options).pipe(res);
});
	
	
router.get('/getcity',function(req,res,next) {
	var myRe = new RegExp("^" + req.query.q);
	console.log(myRe);
	
	fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var cities = data.toString().split("\n")
	
    var jsonresult = [];
	   for(var i = 0; i < cities.length; i++) {
	     var result = cities[i].search(myRe); 
	     if(result != -1) {
	      console.log(cities[i]);
	      jsonresult.push({city:cities[i]});
	     } 
	   }   
	   console.log(jsonresult);
	   res.status(200).json(jsonresult);
    
  })
	console.log("In getcity route");
	console.log(req.query)
});
		  
		  
		  
		  
		  
module.exports = router;

