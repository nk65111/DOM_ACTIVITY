
var unirest = require("unirest");

var req = unirest("GET", "https://tbmdb-bollywood-movies-v1.p.rapidapi.com/v1/movie/%7Bid%7D");

req.query({
	"auth_token": "undefined"
});

req.headers({
	"x-rapidapi-key": "SIGN-UP-FOR-KEY",
	"x-rapidapi-host": "tbmdb-bollywood-movies-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});