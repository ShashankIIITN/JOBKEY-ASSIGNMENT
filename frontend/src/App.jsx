import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ProductPage from "./components/ProductPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/auth/login" element={<LogIn />}></Route>
			<Route path="/auth/signup" element={<SignUp />}></Route>
			<Route path="/products" element={<ProductPage />}></Route>
		</Routes>
	);
}

export default App;
