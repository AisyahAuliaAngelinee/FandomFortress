const errorHandler = (err, req, res, next) => {
	console.log(err, "<<<< Error");
	console.log(err.name, "<<<< Error Name");
	console.log(err.message, "<<<< Error Message");
	let status = 500;
	let message = "INTERNAL SERVER ERROR";

	if (err.name === "SequelizeValidationError") {
		status = 400;
		message = "INVALID CREATE/UPDATE";
	}

	// if (err.message === "notNull Violation: Username Cannot be Null") {
	// 	status = 400;
	// 	message = "INVALID CREATE USER";
	// }

	if (err.message === "UPLOAD YOUR IMAGE PLEASE") {
		status = 400;
		message = "UPLOAD YOUR IMAGE PLEASE";
	}

	if (err.message === "EMAIL REQUIRED") {
		status = 400;
		message = "EMAIL IS REQUIRED";
	}

	if (err.name === "SequelizeUniqueConstraintError") {
		status = 400;
		message = "EMAIL ALREADY USED";
	}

	if (err.message === "PASSWORD REQUIRED") {
		status = 400;
		message = "PASSWORD IS REQUIRED";
	}

	if (err.message === "INVALID LOGIN") {
		status = 401;
		message = "INVALID EMAIL / PASSWORD";
	}

	if (err.name === "JsonWebTokenError") {
		status = 401;
		message = "UNAUTHORIZED";
	}

	if (err.message === "FORBIDDEN") {
		status = 403;
		message = "FORBIDDEN";
	}

	if (err.message === "Permission Denied") {
		status = 403;
		message = "PERMISSION DENIED";
	}

	if (err.message === "FORTRESS NOT FOUND") {
		status = 404;
		message = "FORTRESS NOT FOUND";
	}

	if (err.message === "TYPE NOT FOUND") {
		status = 404;
		message = "TYPE NOT FOUND";
	}

	res.status(status).json({ message });
};

module.exports = errorHandler;
