import React, { useEffect, useState } from "react";
import { URL } from "./auth/Login";
import { Loader } from "./ProductPage";
import { ErrorMessage } from "./ProductPage";
import { GiCancel } from "react-icons/gi";

const OrderCard = ({ order }) => {
	return (
		<div className="border p-4 rounded-lg shadow-md border-slate-500">
			<h2 className="text-lg font-bold">Order ID: {order.order_id}</h2>
			<h3 className="text-md">Product Name: {order.product_name}</h3>
			<p className="text-gray-700">Description: {order.product_description}</p>
			<p className="text-gray-700">Price: ${order.product_price}</p>
			<p className="text-gray-700">Quantity: {order.quantity}</p>
			<h4 className="text-md font-semibold">Seller Information:</h4>
			<p className="text-gray-700">Buyer Name: {order.buyer_name}</p>
			<p className="text-gray-700">Buyer Email: {order.buyer_email}</p>
		</div>
	);
};

function SellerOrder() {
	const [allOrders, setAllOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const cancelOrder = async (id) => {
		const url = `${URL}order/cancel/${id}`;
		try {
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${window.localStorage.getItem("token")}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
			console.log("data", data);

			setAllOrders((prevData) => {
				return [...prevData.filter((el) => el.order_id !== data.id)];
			});
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const getAllProducts = async () => {
		const url = `${URL}order/my/list`;

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
			console.log(data);
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
				Booked Orders
			</h1>
			<div className="flex justify-center h-fit pt-24 gap-10 flex-wrap">
				{allOrders.length === 0 ? (
					<div className="text-xl text-gray-500">
						No products available at the moment.
					</div>
				) : (
					allOrders.map((order) => {
						return (
							<div className="relative">
								<div className="absolute flex justify-end w-full gap-5 p-2 hover:*:cursor-pointer">
									<GiCancel
										color="red"
										onClick={() => cancelOrder(order.order_id)}
									/>
								</div>
								<OrderCard order={order} key={order.order_id} />
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

export default SellerOrder;
