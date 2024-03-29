const braintree = require("braintree");
const config = require("../../config/config");
const PaymentInterface = require("./interface/payment.interface");
const PaymentException = require("./exceptions/payment.exception");

class BraintreeService extends PaymentInterface {
	currencies = {
		THB: config.braintree.thbMerchantAccountId,
		HKD: config.braintree.hkdMerchantAccountId,
		SGD: config.braintree.sgdMerchantAccountId,
	};

	constructor() {
		super();
		this.gatewayBraintree = new braintree.BraintreeGateway({
			environment: braintree.Environment.Sandbox,
			merchantId: config.braintree.merchantId,
			publicKey: config.braintree.publicKey,
			privateKey: config.braintree.privateKey,
		});
	}

	handleErrors(result) {
		const errors = [];
		const transactionValidationErrors =
			result.errors.errorCollections.transaction.validationErrors;
		Object.keys(transactionValidationErrors).forEach((key) => {
			errors.push(transactionValidationErrors[key]);
		});

		const creditCardValidationErrors =
			result.errors.errorCollections.transaction.errorCollections
				.creditCard.validationErrors;
		Object.keys(creditCardValidationErrors).forEach((key) => {
			errors.push(creditCardValidationErrors[key][0]);
		});

		return new PaymentException("Braintree Payment Error", errors);
	}

	handleResult(result) {
		const {
			id,
			globalId,
			amount,
			currencyIsoCode,
			merchantName,
			merchantAddress,
			merchantIdentificationNumber,
			terminalIdentificationNumber,
			...receipt
		} = result.transaction.paymentReceipt;

		const transaction = {
			transactionId: result.transaction.id,
			status: result.transaction.status,
			type: result.transaction.type,
			currencyIsoCode: result.transaction.currencyIsoCode,
			amount: result.transaction.amount,
			amountRequested: result.transaction.amountRequested,
			merchantAccountId: result.transaction.merchantAccountId,
			subMerchantAccountId: result.transaction.subMerchantAccountId,
			masterMerchantAccountId: result.transaction.masterMerchantAccountId,
			orderId: result.transaction.orderId,
			createdAt: result.transaction.createdAt,
			updatedAt: result.transaction.updatedAt,
			receipt,
		};

		return { transaction };
	}

	async sale(transactionParams, currency) {
		const transaction = {
			...transactionParams,
			merchantAccountId: this.currencies[currency],
		};

		return new Promise((resolve, reject) => {
			this.gatewayBraintree.transaction.sale(
				transaction,
				(err, result) => {
					if (result) {
						if (result.success) {
							resolve(this.handleResult(result));
						} else {
							reject(this.handleErrors(result));
						}
					}
					reject(new PaymentException("Braintree Payment Error"));
				}
			);
		});
	}
}

module.exports = BraintreeService;
