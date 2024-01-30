// const PaymentService = require("../services/payment/payment.service.js");
const { catchAsync } = require("../utils/helper.js");

// Mock the Sequelize models
// jest.mock("../models", () => {
// 	return jest.fn().mockImplementation(() => {
// 		return {
// 			transactionRepo: jest.fn().mockReturnThis(),
// 			receiptRepo: jest.fn().mockReturnThis(),
// 			create: jest.fn().mockResolvedValue({
// 				id: 1,
// 			}),
// 		};
// 	});
// });

// Assuming your Sequelize setup and models are defined in a separate module
// const { sequelize, transactionRepo, receiptRepo } = require("../models");

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
			}, 1000);
		});
	});
});
