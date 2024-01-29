class PaymentInterface {
	handleErrors(result) {
		throw new Error("handleErrors Method not implemented");
	}

	handleResult(result) {
		throw new Error("handleResult Method not implemented");
	}

	async sale(transactionParams, currency) {
		throw new Error("sale Method not implemented");
	}
}

module.exports = PaymentInterface;
