const fetch = require('node-fetch');
const { Client } = require('pg')
const OSRSAPI = 'http://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player='


const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: '',
	port: 5432,
})

client.connect();

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


	getAllUsers: async function getAllUsers(req, res, next) {
		res.header('token', 'given-token');
		res.contentType = 'json'
		let query;
		try {
			query = await client.query('SELECT users.user_id FROM users')
			console.log(query.rows);
		} catch (err) {
			next(err);
			return;
		}
		res.send(query.rows);
		next();
	},

	getUser: async function getUser(req, res, next) {
		if(!req.body.UID.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
			res.send(400,'not a valid uuid');
			next();
			return;
		}
		let query;
		try {
			query = await client.query('SELECT * FROM users WHERE users.user_id = $1',[req.body.UID]);
			console.log(query.rows);
		} catch (err) {
			next(err);
			return;
		}
		res.send(query.rows);
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

	createUser: async function createUser(req, res, next) {

		if (req.body.hasOwnProperty("UserName")
			&& req.body.hasOwnProperty("Password")) {


			if (!(req.body.Password) || !(req.body.UserName)) {
				res.send(400, "Empty Field");
				next();
				return;
			}

			if (req.body.Password.length > 10) {
				res.send(400, "Password too Long");
				next();
				return;
			}

			try {
				const res = await client.query('INSERT INTO users VALUES (uuid_generate_v4(),$1, $2, $3)', [req.body.UserName, req.body.Password, req.body.DisplayName])
				console.log(res);
			} catch (err) {
				next(err);
				return;
			}
			res.send(201,"User Created");
			next();

		} else {
			res.send(400,"Bad Request")
			next();
		}
	}

}
