
module.exports = {
	createUserDB: function createUserDB(pool, body) {
		const { UserName, Password, DisplayName } = body;

		pool.query('INSERT INTO UserTable (UserName,Password, DisplayName) VALUES ($1, $2, $3)', [UserName, Password, DisplayName], (error, results) => {
			if (error) {
				throw error
			}
			return `201`;
		})
	}
}
