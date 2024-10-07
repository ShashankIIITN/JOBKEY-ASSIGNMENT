import React, { useState } from "react";

function LogIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		console.log("Logging in:", { email, password });

		setEmail("");
		setPassword("");
	};

	return (
		<div className="login-container flex flex-col justify-center items-center h-full border">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required={true}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required={true}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default LogIn;
