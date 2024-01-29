const ValidationException = require("../exceptions/validation.exception");
const {
	convertCamelCaseToSpaces,
	isObjectNotEmpty,
} = require("../utils/helper");

const convertPropertyName = (value, key) => {
	return value.replace(":property", convertCamelCaseToSpaces(key));
};

const validate = async (body, rules) => {
	return new Promise((resolve, reject) => {
		const errors = [];

		Object.keys(rules).forEach((key) => {
			rules[key].forEach((validateCallback) => {
				let err = validateCallback(body[key]);
				if (err !== true && err !== undefined) {
					err = {
						attribute: key,
						value: body[key],
						message: convertPropertyName(err, key),
					};
					errors.push(err);
				}
			});
		});

		if (isObjectNotEmpty(errors)) {
			reject(new ValidationException("Validation Error", errors));
		}

		resolve(true);
	});
};

module.exports = { validate };
