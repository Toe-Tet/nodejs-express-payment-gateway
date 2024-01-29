const isCreditCardHolderNameValidator = (value) => {
	// Split the name into words
	const words = value.split(" ");

	// Check if each word starts with a capital letter and contains no numbers
	const isValid = words.every(
		(word) => /^[A-Z][a-z]*$/.test(word) && !/\d/.test(word)
	);

	if (!isValid) {
		return "Invalid :property format";
	}

	return true;
};

module.exports = { isCreditCardHolderNameValidator };
