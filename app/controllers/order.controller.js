const { Sequelize } = require("sequelize");
const { transactionRepo, receiptRepo } = require("../models");
const SequelizeValidationException = require("../exceptions/sequelize-validation.exception");
const PaymentService = require("../services/payment/payment.service");
const InternalServerErrorException = require("../exceptions/internal-server-error.exception");

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

		res.render("index", { success: true });
	} catch (error) {
		let errors;
		if (error instanceof Sequelize.ValidationError) {
			errors = new SequelizeValidationException(
				"Sequelize Validation Error",
				error
			);
		} else {
			errors = new InternalServerErrorException();
		}
		console.log(error, "...err");
		return res.status(400).render("index", { errors });
	}
};

module.exports = { index, order };
