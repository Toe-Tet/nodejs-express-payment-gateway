const isFullNameValidator = (value) => {
	const hasNumbers = /\d/.test(value); // Check if the string contains numbers
	const startsWithCapital = /^[A-Z]/.test(value); // Check if the string starts with a capital letter

	if (hasNumbers || !startsWithCapital) {
		return "Invalid :property format";
	}

	return true;
};

module.exports = { isFullNameValidator };
