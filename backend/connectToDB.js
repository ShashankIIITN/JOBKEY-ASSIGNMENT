import pg from "pg";

export const connectTopgDB = () => {
	const pool = new pg.Pool({
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
	});

	pool.connect((err, client, release) => {
		if (err) {
			return console.error("Error acquiring client", err.stack);
		}
		console.log("Connected to the database:", process.env.DB_NAME);
		console.log("As user:", process.env.DB_USER);
		release();
	});

	return pool;
};
