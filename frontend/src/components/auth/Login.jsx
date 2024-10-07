import React, { useState } from "react";
import { FormField } from "./SignUp";
import { useNavigate } from "react-router-dom";

export const URL = "http://localhost:3000/";

function LogIn() {
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
				setformData({
					email: "",
					password: "",
				});
				nav("/auth/signup");
			} else {
				console.error("Login failed:", pdata.message || "Unknown error");
			}
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div className="login-container flex flex-col justify-center items-center h-full border gap-10">
			<h1 className="text-4xl">Login</h1>
			<form
				onSubmit={handleLogin}
				className="text-2xl flex flex-col gap-5 w-[450px] border border-blue-700 p-5"
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
					className="border border-black w-1/3 self-center bg-blue-400 pb-1 hover:bg-blue-200"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default LogIn;
