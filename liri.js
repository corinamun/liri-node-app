var Tweet = require("./keys").twitterKeys;
var Twitter = require('twitter');
var Song = require("./keys").spotifyKeys;
var Spotify = require('node-spotify-api');
var Request = require('request');
var Command = process.argv;

var userInput = process.argv[2];
if (userInput === 'my-tweets') {
	var client = new Twitter(Tweet);
	var params = {screen_name: 'goodgalcoriri'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
		for (var i = 0; i < tweets.length; i++){
			console.log(tweets[i].text);
		}
		}
	})
}

if (userInput === 'spotify-this-song') {
	var songName = "";
	for (var i = 3; i < Command.length; i++){
	songName += Command[i] + " ";
	}
	var spotify = new Spotify(Song);
	spotify.search({ type: 'track', query: songName }, function(err, data) {
  	if (err) {
    	return console.log('Error occurred: ' + err);
  	}
		var artistName = data.tracks.items[0].album.artists[0].name;
		console.log("Artist Name: " + artistName);
		var songName = data.tracks.items[0].name;
		console.log("Song Name: " + songName);
		var previewLink = data.tracks.items[0].external_urls.spotify;
		console.log("Spotify Preview Link: " + previewLink);
		var albumTitle = data.tracks.items[0].album.name;
		console.log("Album Title: " + albumTitle);
	});
}

// if (userInput === 'movie-this') {

// }

// if (userInput === 'do-what-it-says') {

// }

