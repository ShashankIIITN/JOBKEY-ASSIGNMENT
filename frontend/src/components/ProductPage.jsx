import React, { useEffect, useState } from "react";
import { URL } from "./auth/Login";

function ProductPage() {
	const [allProducts, setallProducts] = useState([]);

	const getAllProducts = async () => {
		try {
			const response = await fetch(`${URL}product/all`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();

			console.log(data);
			setallProducts([...data]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<div className="flex justify-center h-full pt-24 gap-10 flex-wrap ">
			{allProducts.map((el, ind) => {
				return (
					<div className="card border border-blue-400 h-fit p-5" key={ind}>
						<div className="card-body text-2xl">
							<h4>Name: {el.name}</h4>
							<p>Description: {el.description}</p>
							<p>Price:{el.price}</p>
							<p>sellerId:{el.seller_id}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ProductPage;
