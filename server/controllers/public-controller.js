const { Lodging } = require("../models");
const { Op } = require("sequelize");

class Controller {
	static async fetchFortress(req, res, next) {
		try {
			let { page, limit, filter, sortBy, keyword } = req.query;
			if (!+page) {
				page = 1;
			}
			limit = limit ? +limit : 10;

			let pagiOption = {};
			if (keyword) {
				pagiOption = {
					limit,
					offset: (page - 1) * limit,
					where: {
						name: {
							[Op.iLike]: `%${keyword}%`,
						},
					},
				};
			} else {
				pagiOption = {
					limit: limit,
					offset: (page - 1) * limit,
				};
			}

			if (filter !== "" && typeof filter !== "undefined") {
				const dataFilter = filter.split(",").map((fill) => ({
					[Op.eq]: fill,
				}));

				pagiOption.where = {
					typeId: {
						[Op.or]: dataFilter,
					},
				};
			}

			if (sortBy !== "" && typeof sortBy !== "undefined") {
				if (sortBy.charAt(0) !== "-") {
					pagiOption.order = [[sortBy, "ASC"]];
				} else {
					pagiOption.order = [[sortBy.slice(1), "DESC"]];
				}
			}

			let { count, rows } = await Lodging.findAndCountAll(pagiOption);
			let result = {
				total: count,
				size: limit,
				totalPage: Math.ceil(count / +limit),
				currentPage: +page,
				filter,
				sortBy,
				keyword,
				data: rows,
			};

			// const fetchData = await Lodging.findAll();
			res.status(200).json({ message: "FANDOM FORTRESS DATA", result });
		} catch (err) {
			next(err);
		}
	}

	static async fetchFortressById(req, res, next) {
		try {
			const { id } = req.params;
			const findFortress = await Lodging.findOne({ where: { id } });
			if (!findFortress) {
				throw { message: "FORTRESS NOT FOUND" };
			}

			res.status(200).json({ message: `DETAIL FORTRESS WITH ID ${id}`, findFortress });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;
