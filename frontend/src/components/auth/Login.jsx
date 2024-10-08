import React, { useEffect, useState } from "react";
import { FormField } from "./SignUp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const URL = import.meta.env.VITE_URL || "http://localhost:3000/";

function LogIn({ setIsLoggedin }) {
	const nav = useNavigate();
	const [formData, setformData] = useState({
		email: "",
		password: "",
	});

	const updateFormdata = (e) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${URL}user/login`, {
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
					email: "",
					password: "",
				});

				setIsLoggedin(true);
				nav("/");
			} else {
				console.error("Login failed:", pdata.message || "Unknown error");
				toast.error(pdata.message);
			}
		} catch (error) {
			console.error("Error during login:", error);
			toast.error(error.message);
		}
	};
	useEffect(() => {
	  console.log(import.meta)
	}, [])
	

	return (
		<div className="login-container flex justify-center items-center h-full">
			<div className=" flex flex-col justify-center items-center bg-slate-400 rounded-md shadow-md gap-2 border border-slate-800">
				<h1 className="text-4xl">Login</h1>
				<form
					onSubmit={handleLogin}
					className="text-2xl flex flex-col gap-5 w-[450px] p-5"
				>
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
						placeholder="Enter your password"
						required={true}
						label="Password"
					/>

					<button
						type="submit"
						className="border rounded-md border-black w-1/3 self-center bg-slate-500 pb-1 hover:bg-blue-200"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default LogIn;
