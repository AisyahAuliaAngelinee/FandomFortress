import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const isEmail = (e) => {
		setEmail(e.target.value);
	};

	const isPassword = (e) => {
		setPassword(e.target.value);
	};

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

	const submitLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(`https://vclrshna.online/login`, { email, password });
			localStorage.setItem("access_token", response.data.access_token);
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
			<section class="header">
				<div class="flex">
					<Link href="" class="logo">
						<img src="assets/logo/png/logo-no-background.png" alt="" />
					</Link>
				</div>
			</section>
			<section className="login">
				<div className="title">
					<h1>Sign In</h1>
				</div>
				<div className="container">
					<div className="left"></div>
					<div className="right">
						<div className="formbox">
							<form action="" onSubmit={submitLogin}>
								<p>Email</p>
								<input type="text" name="email" placeholder="email" onChange={isEmail} value={email} />
								<p>Password</p>
								<input type="password" name="password" placeholder="password" onChange={isPassword} value={password} />
								<button type="submit" className="bg-[#085f63] hover:bg-[#49beb7] text-white hover:text-white font-bold py-2 px-4 rounded-full">
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
