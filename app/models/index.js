const config = require("../config/config.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	config.database.database,
	config.database.username,
	config.database.password,
	{
		host: config.database.host,
		port: config.database.port,
		dialect: config.database.dialect,
	}
);

const transactionRepo = require("./transaction.model.js")(sequelize);
const receiptRepo = require("./receipt.model.js")(sequelize);

module.exports = { sequelize, transactionRepo, receiptRepo };
