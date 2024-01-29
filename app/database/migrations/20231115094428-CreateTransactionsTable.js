"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("transactions", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			transactionId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			currencyIsoCode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			amount: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			amountRequested: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
			},
			merchantAccountId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			subMerchantAccountId: {
				type: Sequelize.STRING,
			},
			masterMerchantAccountId: {
				type: Sequelize.STRING,
			},
			orderId: {
				type: Sequelize.STRING,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deletedAt: {
				type: Sequelize.DATE,
				allowNull: true,
				defaultValue: null,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable("transactions");
	},
};
