class PaymentException extends Error {
	constructor(message = "Payment Error", errors = []) {
		super(message);
		this.name = "PaymentException";
		this.statusCode = 400;
		this.errors = errors;
	}
}

module.exports = PaymentException;
