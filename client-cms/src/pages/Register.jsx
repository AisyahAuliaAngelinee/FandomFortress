import { Link } from "react-router-dom";

const Register = () => {
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
				<div className="register-link">
					<p>
						Already have an account?
						<Link href="" to={"/"}>
							Sign in
						</Link>
					</p>
				</div>
				<div className="regis-container">
					<div className="regis-left"></div>
					<div className="regis-right">
						<div className="regis-formbox">
							<form action="" method="post">
								<p>Username</p>
								<input type="text" name="username" placeholder="username" />
								<p>Email</p>
								<input type="text" name="email" placeholder="email" />
								<p>Password</p>
								<input type="password" name="password" placeholder="password" />
								<p>Phone Number</p>
								<input type="text" name="phoneNumber" placeholder="phone-number" />
								<p>Address</p>
								<input type="text" name="address" placeholder="address" />
								<button type="submit" className="bg-[#085f63] hover:bg-[#49beb7] text-white hover:text-white font-bold py-2 px-4 rounded-full">
									Register
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Register;
