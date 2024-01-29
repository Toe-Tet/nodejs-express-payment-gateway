const isInValidator = (inValues) => {
	const values = inValues;
	// console.log(value, "...check validator");
	return (value) => {
		if (!values.includes(value)) {
			return "The :property is invalid";
		}
		return true;
	};
};

module.exports = { isInValidator };
