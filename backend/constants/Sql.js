export const queries = {
	getAllUser: `Select * from users;`,
	addUser: `INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4) RETURNING *;
        `,
	getUser: `SELECT * FROM users WHERE email = $1`,
	updateProduct: `UPDATE products
        SET name = $1, description = $2, price = $3
        WHERE id = $4 AND seller_id = $5
        RETURNING *;`,
	createProduct: `INSERT INTO products (name, description, price, seller_id)
        VALUES ($1, $2, $3, $4) RETURNING *;`,
	deleteProduct: `DELETE FROM products WHERE id = $1 AND seller_id = $2 RETURNING *;`,
	getAllProducts: `SELECT * FROM products;`,
	getSellerSpecificProducts: `SELECT * FROM products WHERE seller_id = $1;`,
};
