import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<section className="header">
				<div className="flex">
					<Link href="" className="logo">
						<img src="assets/logo/png/logo-no-background.png" alt="" />
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
