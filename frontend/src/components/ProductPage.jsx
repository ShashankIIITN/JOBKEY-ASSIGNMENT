import React, { useEffect, useState } from "react";
import { URL } from "./auth/Login";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
	<div
		className="card border border-slate-800 bg-slate-300 h-fit p-5 rounded-lg shadow-md"
		key={product.id}
	>
		<div className="card-body text-lg">
			<h4 className="font-bold">Name: {product.name}</h4>
			<p>Description: {product.description}</p>
			<p>Price: ${product.price}</p>
			<p>Seller ID: {product.seller_id}</p>
		</div>
	</div>
);

function ProductPage() {
	const [allProducts, setAllProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [open, setOpen] = useState({ open: false, id: "" });
	const [quantity, setquantity] = useState(0);
	const nav = useNavigate();

	useEffect(() => {
		let token = window.localStorage.getItem("token");
		if (!token) {
			nav("/auth/login");
			toast.info("Please login first");
		}
	}, []);

	const handleCloseModal = () => {
		setOpen((prev) => !prev);
	};

	const placeOrder = async (e) => {
		e.preventDefault();
		const url = `${URL}order/place`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${window.localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ quantity, productId: open.id }),
			});
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
			console.log(data);
			handleCloseModal();
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const getAllProducts = async () => {
		const url = `${URL}product/all`;

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
			const dat = data.push(data);
			setAllProducts(data);
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
			<h1 className="text-4xl text-center m-auto sticky top-12 bg-[8898a7] z-10">
				All Products
			</h1>
			<div className="flex justify-center h-fit pt-24 gap-10 flex-wrap">
				{allProducts.length === 0 ? (
					<div className="text-xl text-gray-500">
						No products available at the moment.
					</div>
				) : (
					allProducts.map((product) => {
						return (
							<div className="relative">
								<ProductCard product={product} key={product.id} />;
								<div className="absolute bottom-8 right-2 ">
									<button
										type="button"
										className="bg-slate-400 border border-slate-800 rounded-md px-2 shadow-md"
										onClick={() =>
											setOpen((prev) => ({
												...prev,
												open: !prev.open,
												id: product.id,
											}))
										}
									>
										Place Order
									</button>
								</div>
							</div>
						);
					})
				)}
			</div>
			<Modal open={open.open} onClose={handleCloseModal}>
				<form onSubmit={placeOrder} className="flex flex-col gap-5">
					<div className="flex justify-between">
						<label htmlFor="quantity">Quantity:</label>
						<input
							type="number"
							name="quantity"
							id="quantity"
							value={quantity}
							className="text-black"
							onChange={(e) => setquantity(parseInt(e.target.value))}
						/>
					</div>

					<button
						type="submit"
						className="bg-slate-500 py-1 cursor-pointer px-4 rounded self-center w-fit"
					>
						Submit
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default ProductPage;
