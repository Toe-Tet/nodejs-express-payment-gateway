const isCreditCardExpireValidator = (value) => {
	if (value) {
		// Remove any spaces and split the expiration date into month and year
		const cleanedValue = value.replace(/\s/g, "");
		const [month, year] = cleanedValue.split("/");

		// Check if the month and year are valid numbers
		if (!/^\d+$/.test(month) || !/^\d+$/.test(year)) {
			return "Invalid :property format";
		}

		// Convert strings to numbers
		const numericMonth = parseInt(month, 10);
		const numericYear = parseInt(year, 10);

		// Check if the month is between 1 and 12, and the year is a valid future year
		if (
			!(numericMonth >= 1 && numericMonth <= 12) ||
			!(numericYear >= new Date().getFullYear())
		) {
			return "Invalid :property";
		}
	}

	return true;
};

module.exports = { isCreditCardExpireValidator };
