"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Lodging extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Type, { foreignKey: "typeId" });
			this.belongsTo(models.User, { foreignKey: "authorId" });
		}
	}
	Lodging.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { message: "NAME CANNOT BE NULL" },
					notEmpty: { message: "NAME CANNOT BE EMPTY" },
				},
			},
			facility: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: { message: "FACILITY CANNOT BE NULL" },
					notEmpty: { message: "FACILITY CANNOT BE EMPTY" },
				},
			},
			roomCapacity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: { message: "ROOMCAPACITY CANNOT BE NULL" },
					notEmpty: { message: "ROOMCAPACITY CANNOT BE EMPTY" },
				},
			},
			imgUrl: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { message: "IMAGEURL CANNOT BE NULL" },
					notEmpty: { message: "IMAGEURL CANNOT BE EMPTY" },
					isUrl: true,
				},
			},
			location: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { message: "LOCATION CANNOT BE NULL" },
					notEmpty: { message: "LOCATION CANNOT BE EMPTY" },
				},
			},
			price: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { message: "PRICE CANNOT BE NULL" },
					notEmpty: { message: "PRICE CANNOT BE EMPTY" },
					min: 100000,
				},
			},
			typeId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			authorId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Lodging",
		}
	);
	return Lodging;
};
