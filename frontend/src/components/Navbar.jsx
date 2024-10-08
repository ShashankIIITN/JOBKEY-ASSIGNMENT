import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Navbar({ name, isLoggedin, setIsLoggedin }) {
	const [open, setopen] = useState(false);
	const navigator = useNavigate();

	const handleLogOut = () => {
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("role");
		setIsLoggedin(false);
		navigator("/auth/login");
	};

	const handleMenu = () => {
		let navl = document.querySelector(".Nav_left");
		let navr = document.querySelector(".Nav_right");
		let nav = document.querySelector(".Navbar");

		setopen(!open);

		if (navl?.classList.contains("invisible")) {
			navl.classList.remove("invisible");
			navr.classList.remove("invisible");

			nav.classList.remove("h-12");
			nav.classList.add("h-[17rem]");
		} else {
			navl.classList.add("invisible");
			navr.classList.add("invisible");
			nav.classList.remove("h-[17rem]");
			nav.classList.add("h-12");
		}
	};

	return (
		<div
			className=" Navbar fixed top-0 right-0 w-full flex  flex-col sm:flex-row  sm:justify-between  sm:items-center bg-slate-950   h-12  px-1 xs:px-4  text-white  transition-all ease-in-out duration-300 overflow-clip 
         z-30"
		>
			<div className="Nav_left invisible sm:visible">
				<ul className="flex flex-col sm:flex-row items-start p-2 gap-2 sm:gap-10 flex-wrap w-full">
					<li
						className="cursor-pointer border-b-2 border-transparent hover:border-cyan-400 hover:text-cyan-400 transition ease-linear duration-200"
						onClick={() => navigator("/orders/seller")}
					>
						Booked Orders
					</li>
					<li
						className="cursor-pointer border-b-2 border-transparent hover:border-cyan-400 hover:text-cyan-400 transition ease-in-out duration-200"
						onClick={() => navigator("/orders/my")}
					>
						My Orders
					</li>
					<li
						className="cursor-pointer border-b-2 border-transparent hover:border-cyan-400 hover:text-cyan-400 transition ease-in-out duration-200"
						onClick={() => navigator("/products/my")}
					>
						My Listings
					</li>
					<li
						className="cursor-pointer border-b-2 border-transparent hover:border-cyan-400 hover:text-cyan-400  transition ease-in-out duration-200"
						onClick={() => navigator("/")}
					>
						All Products
					</li>
				</ul>
			</div>
			{!open ? (
				<GiHamburgerMenu
					onClick={handleMenu}
					className="absolute right-5 top-3 text-2xl sm:hidden"
				/>
			) : (
				<IoClose
					onClick={handleMenu}
					className="absolute right-5 top-3 text-2xl sm:hidden"
				/>
			)}
			<div className="Nav_right invisible sm:visible ">
				{!isLoggedin ? (
					<ul className="flex flex-col gap-2 p-2 sm:gap-4 sm:items-center sm:flex-row ">
						<li
							className="cursor-pointer border-b-2 border-transparent hover:border-red-400 hover:text-red-400 transition ease-linear duration-200"
							onClick={() => navigator("/auth/login")}
						>
							Log In
						</li>
						<li
							className="cursor-pointer border-2 w-min border-white p-1 hover:border-red-400 hover:text-red-400 transition ease-linear duration-200 text-nowrap"
							onClick={() => navigator("/auth/signup")}
						>
							Sign Up
						</li>
					</ul>
				) : (
					<div className="Profile_div">
						<h1
							className="cursor-pointer border-2 w-min border-white p-1 hover:border-red-400 hover:text-red-400 transition ease-linear duration-200 text-nowrap"
							onClick={handleLogOut}
						>
							Log Out
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navbar;
