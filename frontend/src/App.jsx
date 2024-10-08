import { Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ProductPage, { productPageType } from "./components/ProductPage";
import Navbar from "./components/Navbar";
import ListingsPage from "./components/ListingsPage";
import MyOrder from "./components/MyOrder";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<ProductPage />}></Route>
				<Route path="/products" element={<ProductPage />}></Route>
				<Route path="/auth/login" element={<LogIn />}></Route>
				<Route path="/auth/signup" element={<SignUp />}></Route>
				<Route path="/orders/my" element={<MyOrder />}></Route>
				<Route path="/products/my" element={<ListingsPage />}></Route>
			</Routes>
		</>
	);
}

export default App;
