const isRequireValidator = (value) => {
	return value ? true : "The :property is required";
};

module.exports = { isRequireValidator };
