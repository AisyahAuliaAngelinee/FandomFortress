const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			throw { message: "Permission Denied" };
		}

		const access_token = authorization.split(" ")[1];
		console.log(access_token, "<<< Token");
		const verified = verifyToken(access_token);

		//? cek apakah user email ada dan sesuai
		const findUser = await User.findOne({
			where: {
				email: verified.email,
			},
		});
		if (!findUser) {
			throw { message: "USER NOT FOUND" };
		}

		//? Membuat object baru dalam request
		req.loginInfo = {
			authorId: findUser.id,
			username: findUser.username,
			email: findUser.email,
			role: findUser.role,
		};

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = authentication;
