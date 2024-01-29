const { transactionRepo } = require("../models");

jest.mock("../models"); // Mock the Sequelize models

// Mock the PaymentService
jest.mock("../services/payment/payment.service", () => {
	return jest.fn().mockImplementation(() => {
		return {
			getService: jest.fn().mockReturnValue({
				sale: jest.fn().mockResolvedValue({
					transaction: {
						id: 1,
						transactionId: "nx8aqv17",
						status: "authorized",
						type: "sale",
						currencyIsoCode: "THB",
						amount: "100.00",
						amountRequested: "100.00",
						merchantAccountId: "thbmerchant",
						subMerchantAccountId: null,
						masterMerchantAccountId: null,
						orderId: null,
					},
					receipt: {
						processorResponseCode: "1000",
						processorResponseText: "Approved",
						processorAuthorizationCode: "0ST1HL",
						type: "sale",
						pinVerified: false,
						processingMode: null,
						networkIdentificationCode: null,
						cardType: "Visa",
						cardLast4: "1111",
						accountBalance: null,
					},
				}),
			}),
		};
	});
});

const { index, order } = require("./order.controller.js");

describe("Order Controller Tests", () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Reset mocks before each test
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
				status: jest.fn().mockReturnThis(),
			};

			// Mock the transactionRepo.create method
			const createdTransaction = {
				id: 1,
				transactionId: "nx8aqv17",
				status: "authorized",
				type: "sale",
				currencyIsoCode: "THB",
				amount: "100.00",
				amountRequested: "100.00",
				merchantAccountId: "thbmerchant",
				subMerchantAccountId: null,
				masterMerchantAccountId: null,
				orderId: null,
			};
			transactionRepo.create.mockResolvedValue(createdTransaction);

			await order(req, res);
			expect(transactionRepo.create).toHaveBeenCalledWith({
				id: 1,
				transactionId: "nx8aqv17",
				status: "authorized",
				type: "sale",
				currencyIsoCode: "THB",
				amount: "100.00",
				amountRequested: "100.00",
				merchantAccountId: "thbmerchant",
				subMerchantAccountId: null,
				masterMerchantAccountId: null,
				orderId: null,
			});

			expect(renderMock).toHaveBeenCalledWith("index", { success: true });
		});
	});
});
