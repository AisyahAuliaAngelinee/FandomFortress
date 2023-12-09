import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const navigate = useNavigate();

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 5000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});

	const onSubmitRegister = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`https://vclrshna.online/add-user`, { username, email, password, phoneNumber, address }, { headers: { Authorization: `Bearer ${localStorage.access_token}` } });
			Toast.fire({
				icon: "success",
				title: data.message,
			});
			navigate("/lodging");
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: error.response.data.message,
			});
		}
	};

	return (
		<>
			<section className="header">
				<div className="flex">
					<Link href="" className="logo">
						<img src="assets/logo/png/logo-no-background.png" alt="" />
					</Link>
				</div>
			</section>
			<section className="register">
				<div className="title">
					<h1>Register</h1>
				</div>
				<div className="regis-container">
					<div className="regis-left"></div>
					<div className="regis-right">
						<div className="regis-formbox">
							<form action="" method="post">
								<p>Username</p>
								<input
									type="text"
									name="username"
									placeholder="username"
									onChange={(e) => {
										setUsername(e.target.value);
									}}
								/>
								<p>Email</p>
								<input
									type="text"
									name="email"
									placeholder="email"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
								<p>Password</p>
								<input
									type="password"
									name="password"
									placeholder="password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
								<p>Phone Number</p>
								<input
									type="text"
									name="phoneNumber"
									placeholder="phone-number"
									onChange={(e) => {
										setPhoneNumber(e.target.value);
									}}
								/>
								<p>Address</p>
								<input
									type="text"
									name="address"
									placeholder="address"
									onChange={(e) => {
										setAddress(e.target.value);
									}}
								/>
								<button type="submit" className="bg-[#085f63] hover:bg-[#49beb7] text-white hover:text-white font-bold py-2 px-4 rounded-full" onClick={onSubmitRegister}>
									Register
								</button>
								<Link to={"/lodging"}>
									<button type="submit" className="bg-[#085f63] hover:bg-red-600 text-white hover:text-white font-bold py-2 px-4 rounded-full">
										Back
									</button>
								</Link>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Register;
