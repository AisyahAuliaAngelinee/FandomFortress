const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

const compareHash = (pass, hash) => {
	return bcrypt.compareSync(pass, hash);
};

module.exports = { hashPassword, compareHash };
