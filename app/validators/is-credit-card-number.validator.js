const isCreditCardNumberValidator = (value) => {
	if (value) {
		// Remove spaces and hyphens from the credit card number
		const cleanedNumber = value.replace(/[\s-]/g, "");

		// Check if the cleaned number is a valid numeric string
		if (!/^\d+$/.test(cleanedNumber)) {
			return "Invalid :property format";
		}
	}

	return true;
};

module.exports = { isCreditCardNumberValidator };
