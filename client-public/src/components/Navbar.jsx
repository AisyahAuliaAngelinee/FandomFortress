import { Link } from "react-router-dom";
import logo from "../assets/logo/png/logo-no-background.png";

const Navbar = () => {
	return (
		<>
			<section className="header">
				<div className="flex">
					<Link href="" className="logo" to={"/"}>
						<img src={logo} alt="" />
					</Link>
					<Link href="" class="btn" to="/rooms">
						Check Rooms
					</Link>
					<div id="menu-btn" className="fas fa-bars"></div>
				</div>
				<nav className="navbar">
					<Link href="" to="/">
						Home
					</Link>
					<Link href="">About</Link>
					<Link href="">Gallery</Link>
					<Link href="">Reservation</Link>
				</nav>
			</section>
		</>
	);
};

export default Navbar;
