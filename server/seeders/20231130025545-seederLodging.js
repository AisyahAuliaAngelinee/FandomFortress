"use strict";
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
		const data = JSON.parse(await fs.readFile("./type.json", "utf-8"));
		data.map((el) => {
			el.createdAt = el.updatedAt = new Date();
			return el;
		});

		await queryInterface.bulkInsert("Types", data, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Types", null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
