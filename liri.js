require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {screen_name: 'brita_ramsay'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(!error) {
        // console.log(tweets);
        tweets.forEach(element => {
            console.log(element.text + '\n' + element.created_at);
        });
    }
});