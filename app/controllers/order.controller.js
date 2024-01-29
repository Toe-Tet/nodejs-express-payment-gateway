const { Sequelize } = require("sequelize");
const { transactionRepo, receiptRepo } = require("../models");
const SequelizeValidationException = require("../exceptions/sequelize-error.exception");
const PaymentService = require("../services/payment/payment.service");
const { catchAsync } = require("../utils/helper");

const index = (req, res) => {
	return res.render("index");
};

const order = catchAsync(async (req, res) => {
	const {
		amount,
		currency,
		customerFullName,
		cardHolderName,
		number,
		expirationDate,
		cardCvv,
	} = req.body;

	const [firstName, lastName] = customerFullName.split(" ");
	const transactionParams = {
		amount,
		creditCard: {
			number,
			expirationDate,
			cvv: cardCvv,
			cardholderName: cardHolderName,
		},
		customer: {
			firstName,
			lastName,
		},
	};

	let paymentService = new PaymentService(currency);

	const { transaction } = await paymentService
		.getService()
		.sale(transactionParams, currency);

	const { receipt, ...transactionData } = transaction;
	const trans = await transactionRepo.create(transactionData);
	await receiptRepo.create({
		...receipt,
		transactionId: trans.id,
	});

	res.render("index", { success: true });
});

module.exports = { index, order };
