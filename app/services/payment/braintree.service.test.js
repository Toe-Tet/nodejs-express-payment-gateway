const BraintreeService = require("./braintree.service");

describe("BraintreeService", () => {
	let braintreeService;

	beforeEach(() => {
		braintreeService = new BraintreeService();
	});

	describe("sale", () => {
		it("should handle a successful sale and an error sale", async () => {
			const transactionParams = {
				amount: "100",
				creditCard: {
					number: "4111111111111111",
					expirationDate: "05/2025",
					cvv: "111",
					cardholderName: "Kyaw Kyaw",
				},
				customer: {
					firstName: "Kyaw",
					lastName: "Kyaw",
				},
			};

			const successResult = await braintreeService.sale(
				transactionParams,
				"THB"
			);
			// Assert the result
			expect(successResult.transaction.status).toEqual("authorized");

			try {
				await braintreeService.sale(
					{ ...transactionParams, amount: 0 },
					"THB"
				);
			} catch (error) {
				expect(error.name).toEqual("PaymentException");
			}
		});
	});
});
