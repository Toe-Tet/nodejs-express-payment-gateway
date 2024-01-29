const { Sequelize } = require("sequelize");
const { transactionRepo, receiptRepo } = require("../models");
const SequelizeValidationException = require("../exceptions/sequelize-validation.exception");
const PaymentService = require("../services/payment/payment.service");

const index = (req, res) => {
	return res.render("index");
};

const order = async (req, res) => {
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

	try {
		const { transaction } = await paymentService
			.getService()
			.sale(transactionParams, currency);

		const { receipt, ...transactionData } = transaction;
		const trans = await transactionRepo.create(transactionData);
		await receiptRepo.create({
			...receipt,
			transactionId: trans.id,
		});

		// console.log(trans, "....trans", receipt, "....receipt");

		res.render("index", { success: true });
	} catch (error) {
		if (error instanceof Sequelize.ValidationError) {
			error = new SequelizeValidationException(
				"Sequelize Validation Error",
				error
			);
		}
		console.log(error, "...err");
		return res.status(400).render("index", { error });
	}
};

module.exports = { index, order };
