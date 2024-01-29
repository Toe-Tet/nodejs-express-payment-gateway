const { extractObject, catchAsync } = require("../utils/helper.js");
const {
	isNumericPositiveValidator,
} = require("../validators/is-numeric-positive.validator.js");
const { validate } = require("../validators/index.validator.js");
const { isRequireValidator } = require("../validators/is-require.validator.js");
const { isInValidator } = require("../validators/is-in.validator.js");
const {
	isFullNameValidator,
} = require("../validators/is-full-name.validator.js");
const {
	isCreditCardHolderNameValidator,
} = require("../validators/is-credit-card-holder-name.validator.js");
const {
	isCreditCardNumberValidator,
} = require("../validators/is-credit-card-number.validator.js");
const {
	isCreditCardExpireValidator,
} = require("../validators/is-credit-card-expire.validator.js");
const {
	isCreditCardCvvValidator,
} = require("../validators/is-credit-card-cvv.validator.js");

const orderDto = catchAsync(async (req, res, next) => {
	await validate(req.body, {
		// amount: [isRequireValidator, isNumericPositiveValidator],
		// currency: [
		// 	isRequireValidator,
		// 	isInValidator(["USD", "EUR", "THB", "HKD", "SGD", "AUD"]),
		// ],
		// customerFullName: [isRequireValidator, isFullNameValidator],
		// cardHolderName: [isRequireValidator, isCreditCardHolderNameValidator],
		// number: [isRequireValidator, isCreditCardNumberValidator],
		// expirationDate: [isRequireValidator, isCreditCardExpireValidator],
		// cardCvv: [isRequireValidator, isCreditCardCvvValidator],
	});

	req.body = extractObject(req.body, [
		"amount",
		"currency",
		"customerFullName",
		"cardHolderName",
		"number",
		"expirationDate",
		"cardCvv",
	]);

	next();
});

module.exports = {
	orderDto,
};
