const { User, Lodging } = require("../models");

const authorization = async (req, res, next) => {
	try {
		// const { authorId, role } = req.loginInfo;
		// const findUser = await User.findOne({ where: { id: authorId } });
		// if (!findUser) {
		// 	throw { message: "USER NOT FOUND" };
		// }

		//! cek apakah dia admin atau bukan
		// if (role !== "admin") {
		// 	throw { message: "FORBIDDEN ACCESS" };
		// }

		const { authorId, role } = req.loginInfo;
		const { id } = req.params;
		if (role === "staff") {
			const fortress = await Lodging.findOne({ where: { authorId } });
			if (!fortress) {
				throw { message: "FORBIDDEN" };
			}

			const fortressById = await Lodging.findByPk(id);
			if (!fortressById) {
				throw { message: "FORBIDDEN" };
			}

			//! cek apakah authorId sama dengan fortress ID yang dibuat
			if (fortress.id !== fortressById.id) {
				throw { message: "FORBIDDEN" };
			}
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = authorization;
