const { Lodging, User } = require("../models");
const imagekit = require("../API/imagekit");

class Controller {
	static async addFortress(req, res, next) {
		try {
			const createFortress = await Lodging.create({
				name: req.body.name,
				facility: req.body.facility,
				roomCapacity: req.body.roomCapacity,
				imgUrl: req.body.imgUrl,
				location: req.body.location,
				price: req.body.price,
				typeId: req.body.typeId,
				authorId: req.body.authorId,
			});

			res.status(201).json({ message: "SUCCESS ADD FORTRESS", createFortress });
		} catch (err) {
			next(err);
		}
	}

	static async getFortress(req, res, next) {
		try {
			const fetchData = await Lodging.findAll();
			res.status(200).json({ message: "FORTRESS DATA", fetchData });
		} catch (err) {
			next(err);
		}
	}

	static async getFortressDetail(req, res, next) {
		try {
			const { id } = req.params;
			const findFortress = await Lodging.findOne({
				where: { id },
			});
			if (!findFortress) {
				throw { message: "FORTRESS NOT FOUND" };
			}

			res.status(200).json({ message: "FORTRESS DETAIL", findFortress });
		} catch (err) {
			next(err);
		}
	}

	static async editFortress(req, res, next) {
		try {
			const { id } = req.params;
			const findFortress = await Lodging.findByPk(id);
			if (!findFortress) {
				throw { message: "FORTRESS NOT FOUND" };
			}

			await Lodging.update(
				{
					name: req.body.name,
					facility: req.body.facility,
					roomCapacity: req.body.roomCapacity,
					imgUrl: req.body.imgUrl,
					location: req.body.location,
					price: req.body.price,
					typeId: req.body.typeId,
				},
				{ where: { id } }
			);

			res.status(201).json({ message: "SUCCESS UPDATE FORTRESS" });
		} catch (err) {
			next(err);
		}
	}

	static async deleteFortress(req, res, next) {
		try {
			const { id } = req.params;
			const findFortress = await Lodging.findOne({
				include: { model: User, where: { id: req.loginInfo.authorId } },
				where: { id },
			});
			if (!findFortress) {
				throw { message: "FORTRESS NOT FOUND" };
			}

			// if (findFortress.authorId !== req.loginInfo.authorId) {
			// 	throw { message: "Permission Denied" };
			// }

			await Lodging.destroy({ where: { id: findFortress.id } });
			res.status(200).json({ message: `Fortress id ${findFortress.id} Success Delete` });
		} catch (err) {
			next(err);
		}
	}

	static async uploadImage(req, res, next) {
		try {
			const { id } = req.params;
			const findFortress = await Lodging.findByPk(id);
			if (!findFortress) {
				throw { message: "FORTRESS NOT FOUND" };
			}

			if (!req.file) {
				throw { message: "UPLOAD YOUR IMAGE PLEASE" };
			}

			let parseBuffer = req.file.buffer.toString("base64");
			let tempImg = await imagekit.upload({
				file: parseBuffer,
				fileName: req.file.originalname,
			});

			await Lodging.update({ imgUrl: tempImg.file }, { where: { id } });
			res.status(200).json({ message: `SUCCESS UPLOAD IMAGE ${tempImg.name}` });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;
