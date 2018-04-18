# liri-node-app

[Watch the demo](https://britaramsay.github.io/liri-node-app/demo-video.mp4)

This node application uses the Spotify and Twitter npm packages to get tweets, information about a song and the OMDb API to get information about a movie. 
---
* [Twitter for Node.js](https://www.npmjs.com/package/twitter)
* [Spotify for Node.js](https://www.npmjs.com/package/spotify)
* [The Open Movie Database](http://omdbapi.com/)
---
Install packages and obtain keys for Twitter and Spotify
---
### List of commands
After 'node liri.js' add one of the following command line arguments:
#### my-tweets
Will display tweets from the username specified in liri.js
#### movie-this specified movie
If no movie is specified after 'movie-this', it will get info about Mr. Nobody. 
#### spotify-this-song specified song
If no song if specified after 'spotify-this-song', it will get info about 'The Sign'.
#### do-what-it-says
Will do one of the above commands specified in random.txt. Separate first command and desired movie/song with a comma.