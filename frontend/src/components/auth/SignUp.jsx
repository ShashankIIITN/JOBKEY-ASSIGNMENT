import React, { useState } from "react";
import { URL } from "./Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const FormField = ({
	type,
	name,
	formData,
	onChange,
	required,
	placeholder,
	className,
	label,
}) => {
	return (
		<div className="flex justify-between items-center ">
			<label>{label}:</label>
			<input
				type={type}
				name={name}
				className={" outline-none border border-black " + className}
				value={formData[name]}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
};

const role = {
	seller: "seller",
	buyer: "buyer",
};

function SignUp({ setIsLoggedin }) {
	const [formData, setformData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: role.buyer,
	});
	const nav = useNavigate();

	const updateFormdata = (e) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSignup = async (e) => {
		e.preventDefault();

		console.log(formData);

		try {
			const response = await fetch(`${URL}user/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const pdata = await response.json();

			console.log(pdata);

			if (pdata.status === "SUCCESS") {
				window.localStorage.setItem("token", pdata.AuthToken);
				window.localStorage.setItem("role", pdata.user.role);
				setformData({
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
				});
				setIsLoggedin(true);
				nav("/");
			} else {
				console.error("Signup failed:", pdata.message || "Unknown error");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};
	return (
		<div className="login-container flex justify-center items-center h-full">
			<div className=" flex flex-col justify-center items-center bg-slate-400 rounded-md shadow-md gap-2 border border-slate-800">
				<h1 className="text-4xl">Sign Up</h1>
				<form
					onSubmit={handleSignup}
					className="text-2xl flex flex-col gap-5 w-[450px] p-5"
				>
					<FormField
						name="name"
						type="text"
						formData={formData}
						onChange={updateFormdata}
						placeholder="Enter your name"
						required={true}
						label="Name"
					/>
					<FormField
						type="email"
						name="email"
						formData={formData}
						onChange={updateFormdata}
						placeholder="Enter your email"
						required={true}
						label="Email"
					/>
					<FormField
						type="password"
						name="password"
						formData={formData}
						onChange={updateFormdata}
						placeholder="Enter new password"
						required={true}
						label="Password"
					/>
					<FormField
						type="password"
						name="confirmPassword"
						formData={formData}
						onChange={updateFormdata}
						placeholder="Re enter your password"
						required={true}
						label="Confirm Password"
					/>
					<div className="flex gap-10 items-center ">
						<label htmlFor="role">Select Role:</label>
						<select
							id="role"
							name="role"
							value={formData.role}
							onChange={updateFormdata}
							className="outline-none border border-black cursor-pointer text-xl px-2 py-1"
						>
							<option value="buyer">Buyer</option>
							<option value="seller">Seller</option>
						</select>
					</div>

					<button
						type="submit"
						className="border border-black w-1/3 self-center bg-slate-500 pb-1 hover:bg-blue-200"
					>
						SignUp
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
