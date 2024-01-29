const isNumericPositiveValidator = (value) => {
	if (value) {
		// console.log(value, "...check validator");
		if (isNaN(value) || parseFloat(value) <= 0) {
			return "The :property must be a numeric value greater than zero";
		}
	}

	return true;
};

module.exports = { isNumericPositiveValidator };
