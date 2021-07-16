let restify = require('restify');
let functions = require('./functions');
let corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
	origins: ["*"],
	allowHeaders: ["*"],
	exposeHeaders: ["*"]
});


const SERVERURL = '';


let server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({
	maxBodySize:0,
	mapParams: true,
	requestBodyOnGet: true
}))

server.get('/hello/:name',functions.greeting);
server.head('/hello/:name',functions.greeting);

server.get('/osrs/:name',functions.osrs);
server.head('/osrs/:name',functions.osrs);

server.get('/videos',functions.getVideos);
server.head('/videos',functions.getVideos);

server.get('/user/getUser',functions.getUser);
server.head('/user/getUser',functions.getUser);

server.get('/allUser',functions.getAllUsers);
server.head('/allUser',functions.getAllUsers);

server.get('/user/:userID',functions.findUser);
server.head('/user/:userID',functions.findUser);

server.get('/videos/:videoID',functions.getVideo);
server.head('/videos/:videoID',functions.getVideo);

server.post('/user/addUser',functions.createUser);
server.head('/user/addUser',functions.createUser);

server.use((req, res, err, next) => {
	if(err){
		res.send(500,'ur shit doesnt work');
		next();
		//send error fuck you ur shit doesnt work
	}
})


server.listen(8080,function(){
	console.log('%s listening at %s', server.name, server.url);
})

