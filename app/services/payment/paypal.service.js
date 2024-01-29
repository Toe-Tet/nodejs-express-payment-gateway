const config = require("../../config/config");
const PaymentInterface = require("./interface/payment.interface");

class PaypalService extends PaymentInterface {
	currencies = {
		USD: config.braintree.usdMerchantAccountId,
		EUR: config.braintree.eurMerchantAccountId,
		AUD: config.braintree.audMerchantAccountId,
	};

	constructor() {
		super();
	}

	handleErrors(result) {
		return;
	}

	handleResult(result) {
		return;
	}
}

module.exports = PaypalService;
