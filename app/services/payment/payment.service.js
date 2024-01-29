const BraintreeService = require("./braintree.service");
const PaypalService = require("./paypal.service");

class PaymentService {
	constructor(currency) {
		this.currency = currency;
	}

	getService() {
		return ["USD", "EUR", "AUD"].includes(this.currency)
			? new PaypalService()
			: new BraintreeService();
	}
}

module.exports = PaymentService;
