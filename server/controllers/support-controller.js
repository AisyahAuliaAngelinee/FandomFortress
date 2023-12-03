const e = require("express");
const { Type } = require("../models");

class Controller {
	static async createType(req, res, next) {
		try {
			const newType = await Type.create({ name: req.body.name });

			res.status(201).json({ message: "NEW TYPE CREATED", newType });
		} catch (err) {
			next(err);
		}
	}

	static async getType(req, res, next) {
		try {
			const showType = await Type.findAll();
			res.status(200).json(showType);
		} catch (err) {
			next(err);
		}
	}

	static async editType(req, res, next) {
		try {
			const { id } = req.params;
			const findType = await Type.findByPk(id);
			if (!findType) {
				throw { message: "TYPE NOT FOUND" };
			}

			const updateType = await Type.update(
				{
					name: req.body.name,
				},
				{
					where: {
						id,
					},
				}
			);

			res.status(201).json({ message: "SUCCESS UPDATE TYPE", updateType });
		} catch (err) {
			next(err);
		}
	}

	static async deleteType(req, res, next) {
		try {
			const { id } = req.params;
			const findType = await Type.findByPk(id);

			if (!findType) {
				throw { message: "TYPE NOT FOUND" };
			}

			await Type.destroy({
				where: {
					id,
				},
			});

			res.status(200).json({ message: `SUCCESS DELETE TYPE WITH ID ${id}` });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;
