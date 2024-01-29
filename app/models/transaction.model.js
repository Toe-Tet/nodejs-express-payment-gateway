const { DataTypes } = require("sequelize");

const transactionModel = (sequelize) => {
	return sequelize.define(
		"transactions",
		{
			transactionId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			currencyIsoCode: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			amountRequested: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			merchantAccountId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			subMerchantAccountId: {
				type: DataTypes.STRING,
			},
			masterMerchantAccountId: {
				type: DataTypes.STRING,
			},
			orderId: {
				type: DataTypes.STRING,
			},
		},
		{
			paranoid: true,
		}
	);
};

module.exports = transactionModel;
