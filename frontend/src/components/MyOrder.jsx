import React, { useEffect, useState } from "react";
import { URL } from "./auth/Login";
import { Loader } from "./ProductPage";
import { ErrorMessage } from "./ProductPage";
import { MdCancel } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "./Modal";

const OrderCard = ({ order }) => {
	return (
		<div className="card border border-slate-800 bg-slate-300 h-fit p-5 rounded-lg shadow-md">
			<h2 className="text-lg font-bold">Order ID: {order.order_id}</h2>
			<h3 className="text-md">Product Name: {order.product_name}</h3>
			<p className="text-gray-700">Description: {order.product_description}</p>
			<p className="text-gray-700">Price: ${order.product_price}</p>
			<p className="text-gray-700">Quantity: {order.quantity}</p>
			<h4 className="text-md font-semibold">Seller Information:</h4>
			<p className="text-gray-700">Seller Name: {order.seller_name}</p>
			<p className="text-gray-700">Seller Email: {order.seller_email}</p>
			<p className="text-gray-700">Order Status: {order.order_status}</p>
		</div>
	);
};

function MyOrder() {
	const [allOrders, setAllOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const nav = useNavigate();

	useEffect(() => {
		let token = window.localStorage.getItem("token");
		let role = window.localStorage.getItem("role");
		if (!token) {
			nav("/auth/login");
			toast.info("Please login first");
		}
	}, []);

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

	const getAllOrders = async () => {
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

			if (Array.isArray(data)) {
				console.log(data);
				setAllOrders(data);
				console.log(data);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllOrders();
	}, []);

	if (loading) return <Loader />;

	if (error) return <ErrorMessage message={error} />;

	return (
		<div className="h-full relative overflow-auto">
			<h1 className="text-4xl text-center m-auto sticky top-12 bg-[#8898a7] z-10 ">
				My Orders
			</h1>
			<div className="flex justify-center h-fit pt-24 gap-10 flex-wrap">
				{allOrders.length === 0 ? (
					<div className="text-xl text-gray-500">
						Please Order Something First.
					</div>
				) : (
					allOrders.map((order) => {
						return (
							<div className="relative">
								<div className="absolute flex justify-end w-full gap-5 p-2 hover:*:cursor-pointer">
									<button
										type="button"
										className="  bg-red-300 text-black rounded-md p-1 text-xs"
										onClick={() => cancelOrder(order.order_id)}
									>
										Cancel
									</button>
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

export default MyOrder;
