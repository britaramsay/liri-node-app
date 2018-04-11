require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var arg = process.argv[2];

switch(arg) {
    case 'my-tweets' :
        var params = {screen_name: 'brita_ramsay'};
        
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if(!error) {
                tweets.forEach(element => {
                    console.log(element.text + '\n' + element.created_at);
                });
            }
        });
    break;
    case 'spotify-this-song':
        var song = process.argv[3];
        if(song == undefined) song = 'Life on Mars?';

        spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {  
            if(err) {
                console.log('An error occurred: ' + err);
            }
            data.tracks.items.forEach(element => {
                console.log(element.name);
                console.log(element.artists[0].name);
                console.log(element.album.name);
                console.log(element.preview_url + '\n');
            });
        });
    break;
}
