const { Sequelize } = require("sequelize");

const receiptModel = (sequelize) => {
	return sequelize.define(
		"receipts",
		{
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
		},
		{
			paranoid: true,
		}
	);
	// .belongsTo(sequelize.models.transactions, {
	// 	foreignKey: "transactionId",
	// });
};

module.exports = receiptModel;
