export const queries = {
	getAllUser: `
        Select * from users;
    `,
	addUser: `
     INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4) RETURNING *;
    `,
	getUser: `SELECT * FROM users WHERE email = $1`,
};
