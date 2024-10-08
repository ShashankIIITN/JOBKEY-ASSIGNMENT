import React, { useEffect, useState } from "react";
import { URL } from "./auth/Login";
import { ProductCard } from "./ProductPage";
import { ErrorMessage } from "./ProductPage";
import { Loader } from "./ProductPage";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { IoAddCircle, IoCreate } from "react-icons/io5";

const EditModal = ({ open, onClose, product, type, updateListing }) => {
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		description: "",
	});
	useEffect(() => {
		if (product && type == "edit") {
			setFormData({
				name: product.name || "",
				price: product.price || "",
				description: product.description || "",
				id: product.id,
			});
		} else {
			setFormData({
				name: "",
				price: "",
				description: "",
			});
		}
	}, [product, type]);

	console.log(formData);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${URL}product${
				type == "edit" ? `/update/${formData.id}` : "/add"
			}`;

			const method = type == "edit" ? "PATCH" : "POST";
			const res = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${window.localStorage.getItem("token")}`,
				},
				body: JSON.stringify(formData),
			});

			console.log(res);

			if (!res.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await res.json();
			console.log(data);
			await updateListing();
			onClose();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Modal
			Heading={type == "edit" ? "Edit Listing" : "Create Listing"}
			open={open}
			onClose={onClose}
		>
			<form onSubmit={handleSubmit} className="flex flex-col gap-5">
				<div className="flex justify-between">
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						name="name"
						id="name"
						className="text-black"
						value={formData?.name}
						onChange={handleChange}
					/>
				</div>
				<div className="flex justify-between">
					<label htmlFor="price">Price: </label>
					<input
						type="number"
						name="price"
						id="price"
						value={formData?.price}
						onChange={handleChange}
						className="text-black"
					/>
				</div>
				<div className="flex justify-between">
					<label htmlFor="description">Description: </label>
					<input
						type="text"
						name="description"
						id="description"
						value={formData?.description}
						onChange={handleChange}
						className="text-black"
					/>
				</div>

				<input
					type="submit"
					value={type == "edit" ? "Update" : "Create"}
					className="bg-slate-500 py-1 cursor-pointer px-4 rounded self-center w-fit"
				/>
			</form>
		</Modal>
	);
};

function ListingsPage() {
	const [allListings, setallListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [modal, setModal] = useState({ open: false, data: {}, type: "edit" });

	const handleCloseModal = () => {
		setModal((prev) => ({ ...prev, open: false }));
	};

	const handleDelete = async (id) => {
		try {
			const url = `${URL}product/delete/${id}`;
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
			setallListings((prevData) => {
				return [...prevData.filter((el) => el.id !== data.id)];
			});

			console.log(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const updateListing = async () => {
		await getAllListings();
	};

	const getAllListings = async () => {
		const url = `${URL}product/my`;

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
			setallListings(data);

			console.log(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllListings();
	}, []);

	if (loading) return <Loader />;

	if (error) return <ErrorMessage message={error} />;

	return (
		<div className="h-full relative overflow-auto">
			<div className="flex justify-center items-center gap-10 h-16 m-auto sticky top-12 bg-white text-4xl z-10">
				<h1 className=" text-center ">All Listings</h1>
				<IoAddCircle
					className="cursor-pointer"
					onClick={() =>
						setModal((prev) => ({ ...prev, open: !prev.open, type: "create" }))
					}
				/>
			</div>
			<div className="flex justify-center h-fit pt-24 gap-10 flex-wrap">
				{allListings.length === 0 ? (
					<div className="text-xl text-gray-500">
						No products available at the moment.
					</div>
				) : (
					allListings.map((product) => {
						return (
							<div className="relative">
								<div className="absolute flex justify-end w-full gap-5 p-2 hover:*:cursor-pointer">
									<FaEdit
										onClick={() =>
											setModal((prev) => ({
												...prev,
												open: !prev.open,
												data: product,
												type: "edit",
											}))
										}
									/>
									<MdDelete
										color="red"
										onClick={() => handleDelete(product.id)}
									/>
								</div>
								<ProductCard product={product} key={product.id} />;
							</div>
						);
					})
				)}
			</div>
			<EditModal
				open={modal.open}
				onClose={handleCloseModal}
				product={modal.data}
				type={modal.type}
				updateListing={updateListing}
			/>
		</div>
	);
}

export default ListingsPage;
