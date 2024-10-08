import React, { useEffect, useState } from "react";
import { URL } from "./auth/Login";

export const Loader = () => (
	<div className="flex justify-center items-center h-full">
		<div
			className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
			role="status"
		>
			<span className="visually-hidden">Loading...</span>
		</div>
	</div>
);

export const ErrorMessage = ({ message }) => (
	<div className="text-red-500 text-center">{message}</div>
);

export const productPageType = {
	ALLPRODUCTS: "ALLPRODUCTS",
	MYLISTINGS: "MYLISTINGS",
};

export const ProductCard = ({ product }) => (
	<div className="card border border-blue-400 h-fit p-5" key={product.id}>
		<div className="card-body text-lg">
			<h4 className="font-bold">Name: {product.name}</h4>
			<p>Description: {product.description}</p>
			<p>Price: ${product.price}</p>
			<p>Seller ID: {product.seller_id}</p>
			{/* Add more functionality like a 'Buy Now' or 'Add to Cart' button here */}
		</div>
	</div>
);

function MyOrder() {
	const [allOrders, setAllOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getAllProducts = async () => {
		const url = `${URL}order/my`;
        

		console.log(window.localStorage.getItem("token"));
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${window.localStorage.getItem("token")}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
            console.log(data)
			setAllOrders(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	if (loading) return <Loader />;

	if (error) return <ErrorMessage message={error} />;

	return (
		<div className="h-full relative overflow-auto">
			<h1 className="text-4xl text-center m-auto sticky top-12 bg-white ">
				My Orders
			</h1>
			<div className="flex justify-center h-fit pt-24 gap-10 flex-wrap">
				{allOrders.length === 0 ? (
					<div className="text-xl text-gray-500">
						No products available at the moment.
					</div>
				) : (
					allOrders.map((product) => (
						<ProductCard product={product} key={product.id} />
					))
				)}
			</div>
		</div>
	);
}

export default MyOrder;
