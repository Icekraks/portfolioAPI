const fetch = require('node-fetch');
const { Pool } = require('pg')
let databaseAccess = require('./databaseAccess');
const OSRSAPI = 'http://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player='


const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'databaseAPI',
	password: 'testpassword',
	port: 5432,
})


async function getOSRSStats(name){
	let APIString = OSRSAPI + name;
	let result
	try{
		result = await fetch(APIString).then(r => r.json());

	} catch (e){
		console.log(e);
		return new Error(e);
	}
	if (result.error) {
		console.log(result.error)
		return new Error(result.error);
	}
	return result;
}

module.exports = {
	greeting: function response(req,res,next){
		res.send('Hello '+ req.params.name);
		next();
	},

	osrs: function osrsStats(req,res,next){
		let osrsStatAPI = getOSRSStats(req.params.name);
		console.log(osrsStatAPI)
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

	createUser: function createUser(req,res,next){
		if(req.body.hasOwnProperty("UserName")
			&& req.body.hasOwnProperty("Password")
			&& req.body.hasOwnProperty("DisplayName"))
		{


			if(!(req.body.Password) || !(req.body.UserName) || !(req.body.DisplayName) ){
				res.send(400,"Empty Field");
				next();
				return;
			}

			if(req.body.Password.length > 10){
				res.send(400,"Password too Long");
				next();
				return;
			}
			console.log(req.body);

			//TODO:DO SOME DATABASE STUFF
			let dbResult = databaseAccess.createUserDB(pool,req.body);
			if(dbResult===201){
				res.send(201);
				next();
			} else {
				console.log("Bad Request");
				res.send(400)
				next();
			}

		} else {
			console.log("Bad Request");
			res.send(400)
			next();
		}




	},

}
