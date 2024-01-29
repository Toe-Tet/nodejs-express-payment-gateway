const isCreditCardCvvValidator = (value) => {
	// Check if the CVV is a valid numeric string and has the correct length (3 or 4)
	if (!/^\d+$/.test(value) || !(value.length === 3 || value.length === 4)) {
		return "Invalid :property format";
	}

	return true;
};

module.exports = { isCreditCardCvvValidator };
