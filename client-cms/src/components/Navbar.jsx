import { Link } from "react-router-dom";
import logo from "../assets/logo/png/logo-no-background.png";

const Navbar = () => {
	return (
		<>
			<section className="header">
				<div className="flex">
					<Link href="" className="logo">
						<img src={logo} alt="" />
					</Link>
				</div>
				<nav className="navbar">
					<Link href="" to={"/lodging"}>
						Lodging
					</Link>
					<Link href="" to={"/type"}>
						Type
					</Link>
					<Link href="" to={"/create"}>
						Create
					</Link>
					<Link href="" to={"/register"}>
						Register (Admin)
					</Link>
					<Link
						href=""
						onClick={() => {
							localStorage.removeItem("access_token");
							navigate("/login");
						}}
					>
						Logout
					</Link>
				</nav>
			</section>
		</>
	);
};

export default Navbar;
