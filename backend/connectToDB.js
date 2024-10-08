import pg from "pg";
import fs from "fs";

const getValue = () => {
	if (process.env.DB_HOST === "localhost") return false;
	else
		return {
			rejectUnauthorized: true,
			ca: fs.readFileSync("./ca.pem").toString(),
		};
};

export const connectTopgDB = () => {
	const pool = new pg.Pool({
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		ssl: getValue(),
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
