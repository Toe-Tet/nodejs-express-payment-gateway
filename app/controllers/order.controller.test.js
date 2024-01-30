const { transactionRepo } = require("../models/index.js");

jest.useFakeTimers();
// Mock Sequelize models
jest.mock("../models/transaction.model.js", () => {
	return jest.fn().mockImplementation(() => {
		return {
			create: jest.fn().mockResolvedValue({
				id: 1,
			}),
		};
	});
});

jest.mock("../models/receipt.model.js", () => {
	return jest.fn().mockImplementation(() => {
		return {
			create: jest.fn().mockResolvedValue({
				id: 1,
			}),
		};
	});
});

// Mock the PaymentService class
jest.mock("../services/payment/payment.service.js", () => {
	return jest.fn().mockImplementation(() => {
		return {
			getService: jest.fn().mockReturnThis(),
			sale: jest.fn().mockResolvedValue({
				transaction: {
					transactionId: "nx8aqv17",
					receipt: {
						processorResponseCode: "1000",
					},
				},
			}),
		};
	});
});

const { index, order } = require("./order.controller.js");

describe("Order Controller Tests", () => {
	beforeEach(() => {
		// Clear the mock calls before each test
		jest.clearAllMocks();
	});

	describe("index", () => {
		it("should render the index page", () => {
			const renderMock = jest.fn();
			const res = { render: renderMock };

			index({}, res);

			expect(renderMock).toHaveBeenCalledWith("index");
		});
	});

	describe("order", () => {
		it("should handle a successful order", async () => {
			// prepare data
			const req = {
				body: {
					amount: "100",
					currency: "THB",
					customerFullName: "Kyaw Kyaw",
					cardHolderName: "Kyaw Kyaw",
					number: "4111111111111111",
					expirationDate: "05/2025",
					cardCvv: "111",
				},
			};
			const renderMock = jest.fn();
			const res = {
				render: renderMock,
			};
			const nextMock = jest.fn();

			// START testing
			order(req, res, nextMock);

			setTimeout(() => {
				expect(renderMock).toHaveBeenCalledWith("index", {
					success: true,
				});
			}, 2000);
		});

		it("should handle an error", async () => {
			const req = {
				body: {
					amount: "100",
					currency: "THB",
					customerFullName: "Kyaw Kyaw",
					cardHolderName: "Kyaw Kyaw",
					number: "4111111111111111",
					expirationDate: "05/2021",
					cardCvv: "11",
				},
			};

			// Mock the transactionRepo.create to throw an error
			transactionRepo.create.mockRejectedValue(
				new Error("Simulated Sequelize Error")
			);

			const nextMock = jest.fn();

			setTimeout(() => {
				expect(order(req, {}, nextMock)).rejects.toThrow(
					"Simulated Sequelize Error"
				);
			}, 2000);
		});
	});
});
