import React, { useState } from "react";

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

function SignUp() {
	const [formData, setformData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const updateFormdata = (e) => {
		setformData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleLogin = (e) => {
		e.preventDefault();
		console.log("Logging in:", { email, password });

		setEmail("");
		setPassword("");
	};
	return (
		<div className="login-container flex flex-col justify-center items-center h-full border gap-10">
			<h1 className="text-4xl">Login</h1>
			<form
				onSubmit={handleLogin}
				className="text-2xl flex flex-col gap-5 w-[450px] border border-blue-700 p-5"
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
				<button
					type="submit"
					className="border border-black w-1/3 self-center bg-blue-400 pb-1 hover:bg-blue-200"
				>
					SignUp
				</button>
			</form>
		</div>
	);
}

export default SignUp;
