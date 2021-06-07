module.exports = {
	greeting: function response(req,res,next){
		res.send('Hello '+ req.params.name);
		next();
	},

	osrs: function osrsStats(req,res,next){
		res.header('token','given-token');
		res.contentType = 'json';
		res.send({hello: 'world'});
		next();
	},

	getVideos: function getVideos(req,res,next){
		res.header('token','given-token');
		res.contentType = 'json'
		let jsonObject = {videos:[
			{videoID: 1},
			{videoID: 2},
		]}
		res.send(jsonObject);
		next();
	},
	getVideo: function getVideo(req,res,next){
		res.header('token','given-token');
		res.contentType = 'json';
		let jsonObject =
			{
				videoID: req.params.videoID,
				videoName: 'testVideo',

			}


		res.send(jsonObject);
		next();
	},


	getAllUsers: function getAllUsers(req,res,next){
		res.header('token','given-token');
		res.contentType = 'json'
		let jsonObject = [
			{userID: 1},
			{userID: 2},
		]
		res.send(jsonObject);
		next();
	},

	getUser: function getUserDetails(req,res,next){
		res.header('token','given-token');
		res.contentType = 'json';
		let jsonObject =
			{
				userID: 1,
				username:'Icekraks',
				password: 'lol',
				displayName: 'Icekraks',
				instagram: 'Icekraks',
				youtube: 'Icekraks',
			}


		res.send(jsonObject);
		next();
	},

	findUser: function findUser(req,res,next){
		res.header('token','given-token');
		res.contentType = 'json';
		let jsonObject =
			{
				userID: req.params.userID,
				username:'Icekraks',
				password: 'lol',
				displayName: 'Icekraks',
				instagram: 'Icekraks',
				youtube: 'Icekraks',
			}


		res.send(jsonObject);
		next();
	},

}
