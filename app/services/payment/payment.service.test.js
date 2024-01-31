const BraintreeService = require("./braintree.service");
const PaymentService = require("./payment.service");
const PaypalService = require("./paypal.service");

jest.mock("./braintree.service");
jest.mock("./paypal.service");

describe("PaymentService Tests", () => {
	it("should create PaypalService for USD currency", () => {
		const paymentService = new PaymentService("USD");
		const result = paymentService.getService();

		expect(result instanceof PaypalService).toBe(true);
	});

	it("should create PaypalService for EUR currency", () => {
		const paymentService = new PaymentService("EUR");
		const result = paymentService.getService();

		expect(result instanceof PaypalService).toBe(true);
	});

	it("should create PaypalService for AUD currency", () => {
		const paymentService = new PaymentService("AUD");
		const result = paymentService.getService();

		expect(result instanceof PaypalService).toBe(true);
	});

	it("should create BraintreeService for THB currency", () => {
		const paymentService = new PaymentService("THB");
		const result = paymentService.getService();

		expect(result instanceof BraintreeService).toBe(true);
	});

	it("should create BraintreeService for HKD currency", () => {
		const paymentService = new PaymentService("HKD");
		const result = paymentService.getService();

		expect(result instanceof BraintreeService).toBe(true);
	});

	it("should create BraintreeService for SGD currency", () => {
		const paymentService = new PaymentService("SGD");
		const result = paymentService.getService();

		expect(result instanceof BraintreeService).toBe(true);
	});
});
