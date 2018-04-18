require("dotenv").config();
// npm packages required
const Twitter = require('twitter'),
      Spotify = require('node-spotify-api'),
      request = require('request'),
      fs = require('fs'),
      keys = require('./keys.js'),
      colors = require('colors');
// Access Twitter and Spotify with api keys
var client = new Twitter(keys.twitter),
    spotify = new Spotify(keys.spotify);
// Save the user entered third command to know which operation to do
var arg = process.argv[2];
// Call checkArg when file is run
checkArg(arg);

function checkArg(arg) {
    switch(arg) {
        // If user entered 'my-tweets' as a command
        case 'my-tweets' :
            var params = {screen_name: 'brita_ramsay'};
            
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if(!error && response.statusCode == 200) {
                    tweets.forEach(element => {
                        console.log(element.text.red + '\n' + element.created_at.cyan + '\n');
                        
                        fs.appendFile('log.txt', element.text + '\n' + element.created_at + '\n\n', function (err) {
                            if (err) console.log(err);
                            console.log('\nSaved to log.txt'.rainbow);
                        });
                    });
                }
            });
        break;
        case 'spotify-this-song':
            // Save the following arguments as the song the api will get
            var song = '';
            var i = 3;

            while(process.argv[i] != undefined) {
                song = song + ' ' + process.argv[i];
                i++;
            }
            // If a song is not entered, call 'The Sign'
            if(song == undefined) song = 'The Sign';
    
            spotify.search({ type: 'track', query: song, limit: 5 }, function (err, data) {  
                if(err) {
                    console.log('An error occurred: ' + err);
                }
                data.tracks.items.forEach(element => {
                    console.log(element.name.green + '\nArtist: ' + element.artists[0].name.blue  + '\nAlbum: ' + element.album.name.magenta + '\n' + element.preview_url + '\n');
                    var appended = false;
                    fs.appendFile('log.txt', element.name + '\n' + element.artists[0].name  + '\n' + element.album.name + '\n' + element.preview_url + '\n\n', function (err) {
                        if (err) throw err;
                        console.log('Saved to log.txt'.rainbow);
                    });
                });
            });
        break;
        case 'movie-this':
            var movie = '';
            var i = 3;

            while(process.argv[i] != undefined) {
                movie = movie + process.argv[i] + ' ';
                i++;
            }
            if(movie == undefined) movie = 'Mr. Nobody';
    
            request('http://www.omdbapi.com/?apikey=trilogy&t='+movie, function(error, response, body) {
                var res = JSON.parse(body);

                console.log(res.Title.bgCyan.black + '\nReleased: ' + res.Year.white + '\nActors: ' + res.Actors.red + '\n' + res.Plot.yellow + '\nIMDB: ' + res.Ratings[0].Value.green + '\nRotton Tomatoes: ' + res.Ratings[1].Value.blue + '\nCountry: ' + res.Country.magenta + '\n\n');

                fs.appendFile('log.txt', res.Title + '\n' + res.Year + '\n' + res.Actors + '\n' + res.Plot + '\n' + res.Ratings[0].Value + '\n' + res.Ratings[1].Value + '\n' + res.Country + '\n\n', function (err) {
                    if (err) throw err;
                    console.log('Saved to log.txt'.rainbow);
                });
            });
        break;
        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf8', function (err, data) {  
                
                if(data.indexOf(',') != -1) {
                    arg = data.substring(0, data.indexOf(','));
                    process.argv[3] = data.substring(data.indexOf(',') + 1, data.length);
                }
                else arg = data.substring(0, data.length - 1);

                checkArg(arg);
            });
        break;
    }
}