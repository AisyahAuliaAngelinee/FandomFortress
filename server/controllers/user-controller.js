const { compareHash } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email) {
				throw { message: "EMAIL REQUIRED" };
			}

			if (!password) {
				throw { message: "PASSWORD REQUIRED" };
			}

			const findUser = await User.findOne({
				where: {
					email,
				},
			});

			if (!findUser) {
				throw { message: "INVALID LOGIN" };
			}

			const isValid = compareHash(password, findUser.password);

			if (!isValid) {
				throw { message: "INVALID LOGIN" };
			}

			const payload = {
				id: findUser.id,
				username: findUser.username,
				email: findUser.email,
				role: findUser.role,
			};

			const token = signToken(payload);
			res.status(200).json({ message: `WELCOME ${payload.username}`, access_token: token });
		} catch (err) {
			next(err);
		}
	}

	static async addUser(req, res, next) {
		try {
			const userBody = {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				phoneNumber: req.body.phoneNumber,
				address: req.body.address,
			};
			const newUser = await User.create(userBody);

			res.status(201).json({ message: "SUCCESS CREATE USER", newUser });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;
