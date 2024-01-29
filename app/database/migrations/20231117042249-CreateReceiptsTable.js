"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("receipts", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			processorResponseCode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			processorResponseText: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			processorAuthorizationCode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			pinVerified: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			processingMode: {
				type: Sequelize.STRING,
			},
			cardType: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cardLast4: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			accountBalance: {
				type: Sequelize.STRING,
			},
			transactionId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "transactions",
					},
					key: "id",
				},
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
		return queryInterface.dropTable("receipts");
	},
};
