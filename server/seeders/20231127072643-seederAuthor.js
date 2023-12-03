"use strict";

const { hashPassword } = require("../helpers/bcrypt");

const fs = require("fs").promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const data = JSON.parse(await fs.readFile("./author.json", "utf-8"));
		data.map((el) => {
			el.createdAt = el.updatedAt = new Date();
			el.password = hashPassword(el.password);
			return el;
		});

		await queryInterface.bulkInsert("Users", data, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('Peopl e', null, {});
		 */
		await queryInterface.bulkDelete("Users", null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
