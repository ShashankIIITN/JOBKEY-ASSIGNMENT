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
	getSellerListedProducts: `SELECT * FROM products WHERE seller_id = $1;`,
	placeOrder: `INSERT INTO orders (product_id, buyer_id, quantity)
                VALUES ($1, $2, $3)
                RETURNING *;
                `,
	findOrderByID: `
        SELECT * FROM orders WHERE id = $1;
      `,
	getAllBuyerOrders: `SELECT 
    o.id AS order_id,
    o.quantity,
    o.status AS order_status,
    p.name AS product_name,
    p.description AS product_description,
    p.price AS product_price,
    s.name AS seller_name,
    s.email AS seller_email
FROM 
    orders o
JOIN 
    products p ON o.product_id = p.id
JOIN 
    users s ON p.seller_id = s.id
WHERE 
    o.buyer_id = $1;
`,
	cancelOrder: `
    DELETE FROM orders
    WHERE id = $1 AND buyer_id = $2
    RETURNING *;
  `,
	updateOrderStatus: `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
	getAllOrdersForSeller: `SELECT 
    o.id AS order_id, 
    o.quantity, 
    o.status AS order_status,
    p.name AS product_name, 
    p.price AS product_price, 
    p.description AS product_description,
    b.name AS buyer_name,
    b.email AS buyer_email
FROM 
    orders o
JOIN 
    products p ON o.product_id = p.id
JOIN 
    users b ON o.buyer_id = b.id
WHERE 
    p.seller_id = $1;
`,
};
