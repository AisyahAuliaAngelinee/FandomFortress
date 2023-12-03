"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Lodging, { foreignKey: "authorId" });
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
					len: [5, 16],
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "staff",
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			phoneNumber: {
				type: DataTypes.STRING,
			},
			address: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.beforeCreate((data) => {
		data.password = hashPassword(data.password);
	});
	return User;
};
