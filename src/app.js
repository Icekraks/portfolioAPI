let restify = require('restify');
let functions = require('./functions')

const SERVERURL = '';


let server = restify.createServer();


server.get('/hello/:name',functions.greeting);
server.head('/hello/:name',functions.greeting);

server.get('/osrs',functions.osrs);
server.head('/osrs',functions.osrs);

server.get('/videos',functions.getVideos);
server.head('/videos',functions.getVideos);

server.get('/user',functions.getUser);
server.head('/user',functions.getUser);

server.get('/allUser',functions.getAllUsers);
server.head('/allUser',functions.getAllUsers);

server.get('/user/:userID',functions.findUser);
server.head('/user/:userID',functions.findUser);

server.get('/videos/:videoID',functions.getVideo);
server.head('/videos/:videoID',functions.getVideo);


server.listen(8080,function(){
	console.log('%s listening at %s', server.name, server.url);
})


