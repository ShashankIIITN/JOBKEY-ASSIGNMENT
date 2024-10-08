import { Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { useState, useEffect } from "react";
import ProductPage from "./components/ProductPage";
import Navbar from "./components/Navbar";
import ListingsPage from "./components/ListingsPage";
import MyOrder from "./components/MyOrder";
import SellerOrder from "./components/SellerOrder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [isLoggedin, setIsLoggedin] = useState(false);

	useEffect(() => {
		const token = window.localStorage.getItem("token");
		if (token) {
			setIsLoggedin(true);
		} else {
			setIsLoggedin(false);
		}
	}, []);

	const handleLoggedId = (state) => {
		setIsLoggedin(state);
		toast.success(state ? "Logged In!" : "Logged Out!");
	};

	return (
		<>
			<Navbar isLoggedin={isLoggedin} setIsLoggedin={handleLoggedId} />
			<Routes>
				<Route path="/" element={<ProductPage />} />
				<Route path="/products" element={<ProductPage />} />
				<Route
					path="/auth/login"
					element={<LogIn setIsLoggedin={handleLoggedId} />}
				/>
				<Route
					path="/auth/signup"
					element={<SignUp setIsLoggedin={handleLoggedId} />}
				/>
				<Route path="/orders/my" element={<MyOrder />} />
				<Route path="/orders/seller" element={<SellerOrder />} />
				<Route path="/products/my" element={<ListingsPage />} />
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
